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
    writer.writerow(["id", "question", "options", "correct_key", "is_active"])
    for m in db.query(MCQ).all():
        writer.writerow([m.id, m.question, m.options, m.correct_key, m.is_active])
    buffer.seek(0)
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=mcqs.csv"},
    )
