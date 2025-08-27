from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import SessionLocal
from app.routers.auth import get_current_user
from app.models.attempt import Attempt, AttemptAnswer

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me")
def analytics_me(user=Depends(get_current_user), db: Session = Depends(get_db)):
    total_attempts = db.query(func.count(Attempt.id)).filter(Attempt.user_id == user.id).scalar() or 0
    correct = db.query(func.count(AttemptAnswer.id)).join(Attempt, Attempt.id == AttemptAnswer.attempt_id).filter(Attempt.user_id == user.id, AttemptAnswer.is_correct == True).scalar() or 0
    total_answers = db.query(func.count(AttemptAnswer.id)).join(Attempt, Attempt.id == AttemptAnswer.attempt_id).filter(Attempt.user_id == user.id).scalar() or 0
    accuracy = (correct / total_answers) if total_answers else 0.0
    return {"total_attempts": int(total_attempts), "accuracy": round(accuracy, 3)}

