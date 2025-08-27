from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
import time
import redis

from app.db.session import SessionLocal
from app.models.attempt import Attempt, AttemptAnswer
from app.models.question import Question, Option
from app.core.config import settings

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

def rds():
    return redis.from_url(settings.redis_url)

@router.post("/{exam_id}/start")
def start(exam_id: int, db: Session = Depends(get_db)):
    att = Attempt(user_id=0, exam_id=exam_id)  # replace user_id with auth
    db.add(att); db.commit(); db.refresh(att)
    # TTL 60 minutes
    r = rds()
    r.setex(f"attempt:{att.id}:expires", 60*60, int(time.time())+60*60)
    return {"attempt_id": att.id, "token": f"att-{att.id}"}

@router.post("/{exam_id}/answer")
def answer(exam_id: int, payload: dict, db: Session = Depends(get_db)):
    att_id = int(payload["attempt_id"])
    q_id = int(payload["q_id"]) ; option_id = int(payload["option_id"]) if payload.get("option_id") else None
    att = db.query(Attempt).get(att_id)
    if not att: raise HTTPException(status_code=404, detail="Attempt not found")
    aa = AttemptAnswer(attempt_id=att.id, question_id=q_id, chosen_option_id=option_id)
    if option_id:
        opt = db.query(Option).get(option_id)
        aa.is_correct = bool(opt.is_correct) if opt else None
        aa.points = 1 if aa.is_correct else 0
    db.add(aa); db.commit(); db.refresh(aa)
    return {"ok": True, "answer_id": aa.id}

@router.post("/{exam_id}/finish")
def finish(exam_id: int, payload: dict, db: Session = Depends(get_db)):
    att_id = int(payload["attempt_id"])
    att = db.query(Attempt).get(att_id)
    if not att: raise HTTPException(status_code=404, detail="Attempt not found")
    total = db.query(func.count(AttemptAnswer.id)).filter(AttemptAnswer.attempt_id == att.id).scalar() or 0
    correct = db.query(func.count(AttemptAnswer.id)).filter(AttemptAnswer.attempt_id == att.id, AttemptAnswer.is_correct == True).scalar() or 0
    att.completed = True; att.score = int(correct)
    db.commit()
    return {"attempt_id": att.id, "total": int(total), "correct": int(correct), "score": int(correct)}

