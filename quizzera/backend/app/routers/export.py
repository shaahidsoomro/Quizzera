from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import csv
import io

from app.db.session import SessionLocal
from app.models.mcq import MCQ

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/mcqs.csv")
def export_mcqs(db: Session = Depends(get_db)):
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["id", "question", "options", "correct_key", "is_active", "exam", "subject", "topic", "difficulty"])
    for m in db.query(MCQ).all():
        writer.writerow([m.id, m.question, m.options, m.correct_key, m.is_active, m.exam, m.subject, m.topic, m.difficulty])
    buffer.seek(0)
    return StreamingResponse(iter([buffer.getvalue()]), media_type="text/csv")


@router.get("/mcqs_template.csv")
def export_mcqs_template():
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["question", "option_a", "option_b", "option_c", "option_d", "correct_key", "exam", "subject", "topic", "difficulty"]) 
    writer.writerow(["What is 2+2?", "1", "2", "3", "4", "d", "FPSC", "General Knowledge", "Math", "easy"]) 
    buffer.seek(0)
    return StreamingResponse(iter([buffer.getvalue()]), media_type="text/csv")