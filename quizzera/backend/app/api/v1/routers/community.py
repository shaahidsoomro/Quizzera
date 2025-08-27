from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.forum import ForumThread, ForumReply

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/forum/categories")
def categories():
    return [
        {"id": 1, "name": "General"},
        {"id": 2, "name": "FPSC"},
        {"id": 3, "name": "UPSC"},
    ]

@router.get("/forum/threads")
def threads(db: Session = Depends(get_db)):
    return db.query(ForumThread).all()

@router.post("/forum/threads")
def new_thread(payload: dict, db: Session = Depends(get_db)):
    t = ForumThread(user_id=0, title=payload.get("title","Untitled"), body=payload.get("body",""))
    db.add(t); db.commit(); db.refresh(t)
    return t

@router.post("/forum/threads/{id}/reply")
def reply(id: int, payload: dict, db: Session = Depends(get_db)):
    if not db.query(ForumThread).get(id): raise HTTPException(status_code=404, detail="Thread not found")
    r = ForumReply(thread_id=id, user_id=0, body=payload.get("body",""))
    db.add(r); db.commit(); db.refresh(r)
    return r

