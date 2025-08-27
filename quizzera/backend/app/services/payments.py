from typing import Literal


PaymentProvider = Literal["jazzcash", "easypaisa"]


def create_payment(provider: PaymentProvider, amount_pk: int, order_id: str, customer_msisdn: str | None = None) -> dict:
    # NOTE: This is a stub. Integrate official SDKs/gateways for production.
    if provider == "jazzcash":
        return {"provider": provider, "order_id": order_id, "amount": amount_pk, "redirect_url": f"https://payments.jazzcash.com/{order_id}"}
    if provider == "easypaisa":
        return {"provider": provider, "order_id": order_id, "amount": amount_pk, "redirect_url": f"https://easypaisa.com/pay/{order_id}"}
    raise ValueError("Unsupported provider")


def verify_payment(provider: PaymentProvider, order_id: str, payload: dict) -> bool:
    # TODO: implement verification callback signature checks
    return True

