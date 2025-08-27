from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
import random

from app.db.session import SessionLocal
from app.models.attempt import Attempt, AttemptAnswer
from app.models.question import Question, Option
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/start")
def start(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    exam_id = payload.get("exam_id")
    if not exam_id:
        raise HTTPException(status_code=400, detail="exam_id required")
    attempt = Attempt(user_id=user.id, exam_id=int(exam_id))
    db.add(attempt)
    db.commit()
    db.refresh(attempt)
    # select a random set of questions (e.g., 100 or all available)
    questions = db.query(Question).filter(Question.exam_id == int(exam_id)).order_by(func.random()).limit(100).all()
    items = []
    for q in questions:
        opts = db.query(Option).filter(Option.question_id == q.id).all()
        random.shuffle(opts)
        items.append({
            "q_id": q.id,
            "stem": q.stem,
            "options": [{"id": o.id, "label": o.label, "text": o.text} for o in opts]
        })
    return {"attempt_id": attempt.id, "items": items}


@router.post("/answer")
def answer(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    attempt_id = payload.get("attempt_id")
    q_id = payload.get("q_id")
    chosen_option_id = payload.get("payload", {}).get("option_id")
    attempt = db.query(Attempt).get(int(attempt_id))
    if not attempt or attempt.user_id != user.id:
        raise HTTPException(status_code=404, detail="Attempt not found")
    ans = AttemptAnswer(attempt_id=attempt.id, question_id=int(q_id), chosen_option_id=int(chosen_option_id))
    # compute correctness
    from app.models.question import Option as Opt
    opt = db.query(Opt).get(int(chosen_option_id))
    ans.is_correct = bool(opt.is_correct) if opt else None
    ans.points = 1 if ans.is_correct else 0
    db.add(ans)
    db.commit()
    db.refresh(ans)
    return {"ok": True, "answer_id": ans.id, "is_correct": ans.is_correct}


@router.post("/finish")
def finish(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    attempt_id = payload.get("attempt_id")
    attempt = db.query(Attempt).get(int(attempt_id))
    if not attempt or attempt.user_id != user.id:
        raise HTTPException(status_code=404, detail="Attempt not found")
    # aggregate score
    total = db.query(func.count(AttemptAnswer.id)).filter(AttemptAnswer.attempt_id == attempt.id).scalar() or 0
    correct = db.query(func.count(AttemptAnswer.id)).filter(AttemptAnswer.attempt_id == attempt.id, AttemptAnswer.is_correct == True).scalar() or 0
    attempt.completed = True
    attempt.score = int(correct)
    db.commit()
    return {"attempt_id": attempt.id, "total": int(total), "correct": int(correct), "score": int(correct)}


@router.get("/attempts/{id}")
def attempt_result(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    from app.models.question import Option as Opt
    att = db.query(Attempt).get(id)
    if not att or att.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    answers = db.query(AttemptAnswer).filter(AttemptAnswer.attempt_id == id).all()
    breakdown = []
    for a in answers:
        opt = db.query(Opt).get(a.chosen_option_id) if a.chosen_option_id else None
        breakdown.append({
            "question_id": a.question_id,
            "chosen_option_id": a.chosen_option_id,
            "is_correct": a.is_correct,
            "points": a.points,
        })
    return {"attempt": {"id": att.id, "score": att.score, "completed": att.completed}, "breakdown": breakdown}

