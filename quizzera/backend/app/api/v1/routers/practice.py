from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import SessionLocal
from app.models.question import Question, Option

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.post("/session/start")
def start_session(payload: dict, db: Session = Depends(get_db)):
    exam_id = payload.get("exam_id")
    if not exam_id:
        raise HTTPException(status_code=400, detail="exam_id required")
    # sample order: random 20 questions
    qs = db.query(Question.id).filter(Question.exam_id == int(exam_id)).order_by(func.random()).limit(20).all()
    order = [q.id for q in qs]
    # server-side gate: next_allowed index starts at 0
    return {"session_id": f"sess-{exam_id}", "order": order, "next_allowed": 0}

@router.get("/session/{sid}/question/{index}")
def get_question(sid: str, index: int, db: Session = Depends(get_db)):
    # minimal mock; real impl would track session state in Redis/DB
    q = db.query(Question).get(index)
    if not q: raise HTTPException(status_code=404, detail="Not found")
    opts = db.query(Option).filter(Option.question_id == q.id).all()
    return {"id": q.id, "stem": q.stem, "options": [{"id": o.id, "label": o.label, "text": o.text} for o in opts]}

@router.post("/session/{sid}/answer")
def submit_answer(sid: str, payload: dict):
    # store answer and force reveal before next
    # return flag to allow next after client shows explanation
    return {"allow_next": True, "explanation_required": True}

@router.post("/session/{sid}/finish")
def finish_session(sid: str):
    return {"ok": True, "summary": {"total": 20, "correct": 15}}

