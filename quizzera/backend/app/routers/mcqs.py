from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import csv
import io

from app.db.session import SessionLocal
from app.models.mcq import MCQ
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_mcqs(db: Session = Depends(get_db)):
    return db.query(MCQ).filter(MCQ.is_active == True).all()


@router.post("")
def create_mcq(mcq: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = MCQ(question=mcq["question"], options=mcq["options"], correct_key=mcq["correct_key"], is_active=True)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m


@router.post("/import")
def import_mcqs(file: UploadFile = File(...), db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    content = file.file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(content))
    required = {"question", "option_a", "option_b", "option_c", "option_d", "correct_key"}
    if set(reader.fieldnames or []) != required:
        # allow superset but must include required
        if not required.issubset(set(reader.fieldnames or [])):
            raise HTTPException(status_code=400, detail="Invalid CSV header. Download the template from /export/mcqs_template.csv")
    created = 0
    for row in reader:
        options = {
            "a": row.get("option_a", ""),
            "b": row.get("option_b", ""),
            "c": row.get("option_c", ""),
            "d": row.get("option_d", ""),
        }
        correct = (row.get("correct_key") or "").strip().lower()
        if correct not in {"a", "b", "c", "d"}:
            continue
        m = MCQ(question=row.get("question", "").strip(), options=options, correct_key=correct, is_active=True)
        db.add(m)
        created += 1
    db.commit()
    return {"created": created}


@router.put("/{mcq_id}")
def update_mcq(mcq_id: int, mcq: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = db.query(MCQ).get(mcq_id)
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    m.question = mcq.get("question", m.question)
    m.options = mcq.get("options", m.options)
    m.correct_key = mcq.get("correct_key", m.correct_key)
    db.commit()
    db.refresh(m)
    return m


@router.delete("/{mcq_id}")
def delete_mcq(mcq_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    m = db.query(MCQ).get(mcq_id)
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(m)
    db.commit()
    return {"ok": True}