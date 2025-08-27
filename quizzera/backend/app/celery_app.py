import os
from celery import Celery

broker_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
backend_url = broker_url

celery = Celery("quizzera", broker=broker_url, backend=backend_url)
celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery.task
def autosubmit_attempt(attempt_id: int):
    # TODO: load DB and finalize attempt when TTL reached
    print(f"Autosubmit attempt {attempt_id}")

