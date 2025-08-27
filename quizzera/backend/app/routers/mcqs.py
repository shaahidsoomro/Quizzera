from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.mcq import MCQ
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_mcqs(db: Session = Depends(get_db)):
    return db.query(MCQ).filter(MCQ.is_active == True).all()


@router.post("")
def create_mcq(mcq: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = MCQ(question=mcq["question"], options=mcq["options"], correct_key=mcq["correct_key"], is_active=True)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m


@router.put("/{mcq_id}")
def update_mcq(mcq_id: int, mcq: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = db.query(MCQ).get(mcq_id)
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    m.question = mcq.get("question", m.question)
    m.options = mcq.get("options", m.options)
    m.correct_key = mcq.get("correct_key", m.correct_key)
    db.commit()
    db.refresh(m)
    return m


@router.delete("/{mcq_id}")
def delete_mcq(mcq_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = db.query(MCQ).get(mcq_id)
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(m)
    db.commit()
    return {"ok": True}