from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.exam import ExamBody, Exam, Subject, Topic

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_exams(db: Session = Depends(get_db)):
    bodies = db.query(ExamBody).all()
    result = []
    for b in bodies:
        exams = db.query(Exam).filter(Exam.body_id == b.id).all()
        out_exams = []
        for e in exams:
            subjects = db.query(Subject).filter(Subject.exam_id == e.id).all()
            out_subjects = []
            for s in subjects:
                topics = db.query(Topic).filter(Topic.subject_id == s.id).all()
                out_subjects.append({"id": s.id, "name": s.name, "weightage": s.weightage, "topics": [{"id": t.id, "name": t.name} for t in topics]})
            out_exams.append({"id": e.id, "title": e.title, "slug": e.slug, "bps_min": e.bps_min, "bps_max": e.bps_max, "duration_min": e.duration_min, "randomized": bool(e.randomized), "subjects": out_subjects})
        result.append({"id": b.id, "name": b.name, "slug": b.slug, "exams": out_exams})
    return result


@router.get("/{slug}")
def get_exam(slug: str, db: Session = Depends(get_db)):
    e = db.query(Exam).filter(Exam.slug == slug).first()
    if not e:
        raise HTTPException(status_code=404, detail="Not found")
    subjects = db.query(Subject).filter(Subject.exam_id == e.id).all()
    out_subjects = []
    for s in subjects:
        topics = db.query(Topic).filter(Topic.subject_id == s.id).all()
        out_subjects.append({"id": s.id, "name": s.name, "weightage": s.weightage, "topics": [{"id": t.id, "name": t.name} for t in topics]})
    return {"id": e.id, "title": e.title, "slug": e.slug, "bps_min": e.bps_min, "bps_max": e.bps_max, "duration_min": e.duration_min, "randomized": bool(e.randomized), "subjects": out_subjects}

