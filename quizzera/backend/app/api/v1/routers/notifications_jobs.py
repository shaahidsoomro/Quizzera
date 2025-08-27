from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.db.session import SessionLocal
from app.models.others import Notification, Job

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/notifications")
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).order_by(desc(Notification.publish_date)).limit(100).all()

@router.post("/notifications")
def create_notification(payload: dict, db: Session = Depends(get_db)):
    n = Notification(**payload)
    db.add(n); db.commit(); db.refresh(n)
    return n

@router.get("/jobs")
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).order_by(desc(Job.deadline)).limit(200).all()

@router.post("/jobs")
def create_job(payload: dict, db: Session = Depends(get_db)):
    j = Job(**payload)
    db.add(j); db.commit(); db.refresh(j)
    return j

