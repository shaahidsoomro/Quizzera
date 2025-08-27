from fastapi import APIRouter, HTTPException
from app.services.payments import create_payment, verify_payment

router = APIRouter()

@router.post("/payments/create")
def payments_create(payload: dict):
    try:
        return create_payment(
            provider=payload["provider"],
            amount_pk=int(payload["amount"]),
            order_id=payload["order_id"],
            customer_msisdn=payload.get("msisdn"),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/payments/verify")
def payments_verify(payload: dict):
    ok = verify_payment(provider=payload["provider"], order_id=payload["order_id"], payload=payload)
    return {"verified": ok}

