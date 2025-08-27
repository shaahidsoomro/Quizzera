from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.others import PastPaper

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("")
def list_past_papers(exam_id: int | None = None, year: int | None = None, db: Session = Depends(get_db)):
    q = db.query(PastPaper)
    if exam_id: q = q.filter(PastPaper.exam_id == exam_id)
    if year: q = q.filter(PastPaper.year == year)
    return q.all()

@router.post("")
def upload_past_paper(exam_id: int, subject_id: int, year: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="PDF required")
    url = f"/uploads/{file.filename}"
    pp = PastPaper(exam_id=exam_id, subject_id=subject_id, year=year, pdf_url=url, parsed_json=None)
    db.add(pp); db.commit(); db.refresh(pp)
    return pp

