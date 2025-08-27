import os
import time
from rq import Queue, Connection, Worker
import redis


def get_redis_url() -> str:
    return os.environ.get("REDIS_URL", "redis://localhost:6379/0")


def run_worker() -> None:
    url = get_redis_url()
    r = redis.from_url(url)
    with Connection(r):
        w = Worker([Queue("default")])
        w.work(with_scheduler=True)


if __name__ == "__main__":
    run_worker()

