from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.forum import ForumThread, ForumReply
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/forum")
def forum(db: Session = Depends(get_db)):
    threads = db.query(ForumThread).all()
    return threads


@router.post("/community/thread")
def new_thread(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    t = ForumThread(user_id=user.id, title=payload.get("title", "Untitled"), body=payload.get("body", ""))
    db.add(t)
    db.commit()
    db.refresh(t)
    return t


@router.post("/community/reply")
def reply(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    thread_id = payload.get("thread_id")
    if not db.query(ForumThread).get(int(thread_id)):
        raise HTTPException(status_code=404, detail="Thread not found")
    r = ForumReply(thread_id=int(thread_id), user_id=user.id, body=payload.get("body", ""))
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

