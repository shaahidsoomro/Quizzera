from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.exam import ExamBody, Exam, Subject, Topic
from app.models.mcq import MCQ
from app.models.others import Notification, Job


def seed():
    db: Session = SessionLocal()
    try:
        fpsc = db.query(ExamBody).filter(ExamBody.slug == 'fpsc').first()
        if not fpsc:
            fpsc = ExamBody(name='FPSC', slug='fpsc')
            db.add(fpsc)
            db.commit()
            db.refresh(fpsc)
        exam = db.query(Exam).filter(Exam.slug == 'fpsc-gr').first()
        if not exam:
            exam = Exam(title='FPSC General Recruitment', slug='fpsc-gr', body_id=fpsc.id, bps_min=16, bps_max=21)
            db.add(exam)
            db.commit()
            db.refresh(exam)
        gk = Subject(exam_id=exam.id, name='General Knowledge', weightage=20)
        eng = Subject(exam_id=exam.id, name='English', weightage=20)
        db.add_all([gk, eng])
        db.commit()
        topics = [Topic(subject_id=gk.id, name='Math'), Topic(subject_id=gk.id, name='Pakistan Affairs'), Topic(subject_id=eng.id, name='Vocabulary')]
        db.add_all(topics)
        db.commit()
        # MCQs
        created = 0
        for i in range(1, 51):
            m = MCQ(question=f"Sample MCQ #{i}: 2+2?", options={"a":"1","b":"2","c":"3","d":"4"}, correct_key="d", is_active=True, exam='FPSC', subject='General Knowledge', topic='Math', difficulty='easy')
            db.add(m)
            created += 1
        db.commit()
        # Notifications & jobs
        n1 = Notification(body_id=fpsc.id, title='FPSC Consolidated Adv 04/2025', ref_no='04/2025')
        db.add(n1)
        db.commit()
        jb = Job(notification_id=n1.id, title='Assistant Director (BPS-17)', department='Ministry of X', bps_scale=17, province_quota='Punjab', seats=10, apply_link='https://fpsc.gov.pk', deadline=None)
        db.add(jb)
        db.commit()
        print('Seed completed')
    finally:
        db.close()


if __name__ == '__main__':
    seed()

