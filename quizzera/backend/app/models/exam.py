from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, ForeignKey, Text
from app.models.base import Base

class ExamBody(Base):
    __tablename__ = "exam_bodies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

class Exam(Base):
    __tablename__ = "exams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    body_id: Mapped[int] = mapped_column(Integer, ForeignKey("exam_bodies.id"), nullable=False)
    bps_min: Mapped[int] = mapped_column(Integer, default=16)
    bps_max: Mapped[int] = mapped_column(Integer, default=21)
    description: Mapped[str | None] = mapped_column(Text)
    duration_min: Mapped[int] = mapped_column(Integer, default=60)
    randomized: Mapped[bool] = mapped_column(Integer, default=1)

class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    exam_id: Mapped[int] = mapped_column(Integer, ForeignKey("exams.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    weightage: Mapped[int] = mapped_column(Integer, default=0)

class Topic(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    subject_id: Mapped[int] = mapped_column(Integer, ForeignKey("subjects.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)