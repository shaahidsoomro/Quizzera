import os
import sys

# Ensure application package is importable
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# Set environment variables before importing app modules
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("JWT_SECRET", "testsecret")

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.db.session import SessionLocal, engine
from app.models.mcq import Exam, MCQ
from app.models.user import User
from app.models.base import Base
from app.routers.auth import get_current_user

client = TestClient(app)


def override_get_current_user():
    db: Session = SessionLocal()
    user = db.query(User).first()
    db.close()
    return user

app.dependency_overrides = getattr(app, "dependency_overrides", {})
app.dependency_overrides[get_current_user] = override_get_current_user


def setup_module(module):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    db.query(User).delete()
    db.query(Exam).delete()
    db.query(MCQ).delete()
    db.commit()
    user = User(email="user@example.com", hashed_password="x", role="student")
    db.add(user)
    exam = Exam(title="Sample Exam")
    db.add(exam)
    mcq = MCQ(question="1+1?", options={"a": "2", "b": "3"}, correct_key="a", is_active=True)
    db.add(mcq)
    db.commit()
    db.close()


def teardown_module(module):
    db = SessionLocal()
    db.query(User).delete()
    db.query(Exam).delete()
    db.query(MCQ).delete()
    db.commit()
    db.close()


def test_submit_exam_scores_correctly():
    db = SessionLocal()
    exam = db.query(Exam).first()
    db.close()
    start = client.post(f"/exams/{exam.id}/start")
    assert start.status_code == 200
    mcq_id = start.json()["mcqs"][0]["id"]
    payload = {"answers": {str(mcq_id): "a"}}
    submit = client.post(f"/exams/{exam.id}/submit", json=payload)
    assert submit.status_code == 200
    assert submit.json()["score"] == 1

