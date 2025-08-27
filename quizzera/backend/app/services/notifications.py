from app.app.celery_app import celery


@celery.task
def send_email_task(to: str, subject: str, body: str):
    print(f"Email -> {to}: {subject}")


@celery.task
def send_sms_task(to: str, message: str):
    print(f"SMS -> {to}: {message}")


def queue_exam_start_notifications(user_email: str, user_phone: str, exam_title: str):
    send_email_task.delay(user_email, f"Exam Started: {exam_title}", "Good luck!")
    if user_phone:
        send_sms_task.delay(user_phone, f"Exam {exam_title} started. Good luck!")

