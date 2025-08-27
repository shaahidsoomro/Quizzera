from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.attempt import Attempt, AttemptAnswer

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/{id}")
def get_attempt(id: int, db: Session = Depends(get_db)):
    att = db.query(Attempt).get(id)
    if not att: raise HTTPException(status_code=404, detail="Not found")
    answers = db.query(AttemptAnswer).filter(AttemptAnswer.attempt_id == id).all()
    return {"attempt": {"id": att.id, "score": att.score, "completed": att.completed}, "answers": answers}

