from rq import Queue
import redis
import os


def get_queue() -> Queue:
    r = redis.from_url(os.environ.get("REDIS_URL", "redis://localhost:6379/0"))
    return Queue("default", connection=r)


def send_email(to: str, subject: str, body: str) -> None:
    # Placeholder for emailing (SES/SMTP)
    print(f"Sending email to {to}: {subject}")


def enqueue_email(to: str, subject: str, body: str):
    q = get_queue()
    q.enqueue(send_email, to, subject, body)

