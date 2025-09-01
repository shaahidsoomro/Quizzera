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
from app.models.mcq import Exam
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
    db.commit()
    user = User(email="user@example.com", hashed_password="x", role="student")
    db.add(user)
    db.add(Exam(title="Sample Exam"))
    db.commit()
    db.close()


def teardown_module(module):
    db = SessionLocal()
    db.query(User).delete()
    db.query(Exam).delete()
    db.commit()
    db.close()


def test_start_exam_twice_returns_400():
    db = SessionLocal()
    exam = db.query(Exam).first()
    db.close()
    url = f"/exams/{exam.id}/start"
    first = client.post(url)
    assert first.status_code == 200
    second = client.post(url)
    assert second.status_code == 400
