import time
import redis
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.core.config import settings


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_per_minute: int = 60):
        super().__init__(app)
        self.r = redis.from_url(settings.redis_url)
        self.max = max_per_minute

    async def dispatch(self, request, call_next):
        if request.url.path.startswith("/api/v1/auth"):
            ip = request.client.host if request.client else "anon"
            key = f"rl:{ip}:{int(time.time() // 60)}"
            val = self.r.incr(key)
            if val == 1:
                self.r.expire(key, 60)
            if val > self.max:
                return JSONResponse({"detail": "Too many requests"}, status_code=429)
        return await call_next(request)

