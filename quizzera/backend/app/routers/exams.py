from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import random

from app.db.session import SessionLocal
from app.models.mcq import Exam, ExamAttempt, MCQ
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{exam_id}/start")
def start_exam(exam_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    existing = db.query(ExamAttempt).filter(ExamAttempt.user_id == user.id, ExamAttempt.exam_id == exam_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already attempted")
    attempt = ExamAttempt(user_id=user.id, exam_id=exam_id)
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    mcqs = db.query(MCQ).filter(MCQ.is_active == True).all()
    random.shuffle(mcqs)
    mcq_dicts = [
        {"id": m.id, "question": m.question, "options": m.options}
        for m in mcqs
    ]

    return {"attempt_id": attempt.id, "exam_id": exam_id, "mcqs": mcq_dicts}


@router.post("/{exam_id}/submit")
def submit_exam(exam_id: int, payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    attempt = db.query(ExamAttempt).filter(ExamAttempt.user_id == user.id, ExamAttempt.exam_id == exam_id).first()
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    answers = payload.get("answers", {})
    mcqs = db.query(MCQ).filter(MCQ.id.in_(map(int, answers.keys()))).all()

    score = 0
    for m in mcqs:
        chosen = answers.get(str(m.id))
        if chosen == m.correct_key:
            score += 1

    attempt.answers = answers
    attempt.score = score
    attempt.submitted_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(attempt)

    return {"attempt_id": attempt.id, "score": score}


@router.get("/{exam_id}/result")
def exam_result(exam_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    attempt = db.query(ExamAttempt).filter(ExamAttempt.user_id == user.id, ExamAttempt.exam_id == exam_id).first()
    if not attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return attempt
