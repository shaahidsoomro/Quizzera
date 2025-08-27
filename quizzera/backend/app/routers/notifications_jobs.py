from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.db.session import SessionLocal
from app.models.others import Notification, Job
from app.routers.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/notifications")
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).order_by(desc(Notification.publish_date)).limit(100).all()


@router.post("/notifications")
def create_notification(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    n = Notification(**payload)
    db.add(n)
    db.commit()
    db.refresh(n)
    return n


@router.get("/jobs")
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).order_by(desc(Job.deadline)).limit(200).all()


@router.post("/jobs")
def create_job(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    j = Job(**payload)
    db.add(j)
    db.commit()
    db.refresh(j)
    return j

