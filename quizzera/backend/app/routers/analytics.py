from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.db.session import SessionLocal
from app.models.mcq import ExamAttempt

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/stats")
def stats(db: Session = Depends(get_db)):
    total_attempts = db.query(func.count(ExamAttempt.id)).scalar() or 0
    avg_score = db.query(func.avg(ExamAttempt.score)).scalar()
    return {"total_attempts": total_attempts, "avg_score": float(avg_score) if avg_score is not None else 0.0}


@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    rows = (
        db.query(ExamAttempt.user_id, func.max(ExamAttempt.score).label("best"))
        .group_by(ExamAttempt.user_id)
        .order_by(desc("best"))
        .limit(50)
        .all()
    )
    return [{"user_id": r.user_id, "score": int(r.best)} for r in rows]