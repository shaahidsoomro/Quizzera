from fastapi import APIRouter

router = APIRouter()


@router.post("/check")
def check(payload: dict):
    age = int(payload.get("age", 0))
    degree = (payload.get("degree") or "").lower()
    domicile = (payload.get("domicile") or "").lower()
    experience = int(payload.get("experience", 0))

    reasons = []
    eligible = True
    if age < 21 or age > 35:
        eligible = False
        reasons.append("Age not within 21-35 standard range (general)")
    if "bachelor" not in degree and "master" not in degree:
        eligible = False
        reasons.append("Minimum Bachelor degree required (typical FPSC GR)")
    if domicile == "":
        reasons.append("Domicile not provided; province/quota may apply")
    if experience < 0:
        reasons.append("Experience invalid")

    decision = "Eligible" if eligible else ("Conditional" if reasons and eligible else "Not eligible")
    return {"decision": decision, "reasons": reasons}

