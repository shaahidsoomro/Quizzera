from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import SessionLocal
from app.models.attempt import Attempt, AttemptAnswer

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/me")
def me(db: Session = Depends(get_db)):
    user_id = 0
    total_attempts = db.query(func.count(Attempt.id)).filter(Attempt.user_id == user_id).scalar() or 0
    correct = db.query(func.count(AttemptAnswer.id)).join(Attempt, Attempt.id == AttemptAnswer.attempt_id).filter(Attempt.user_id == user_id, AttemptAnswer.is_correct == True).scalar() or 0
    total_answers = db.query(func.count(AttemptAnswer.id)).join(Attempt, Attempt.id == AttemptAnswer.attempt_id).filter(Attempt.user_id == user_id).scalar() or 0
    accuracy = (correct / total_answers) if total_answers else 0.0
    return {"total_attempts": int(total_attempts), "accuracy": round(accuracy,3)}

@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    rows = db.query(Attempt.user_id, func.max(Attempt.score).label("best"))\
        .group_by(Attempt.user_id).order_by(func.max(Attempt.score).desc()).limit(50).all()
    return [{"user_id": r.user_id, "score": int(r.best)} for r in rows]

