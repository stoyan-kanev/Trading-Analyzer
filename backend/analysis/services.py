# analysis/services.py

def evaluate_setup(data):
    score = 0
    reasons = []
    warnings = []

    daily_bias = data.get("daily_bias")
    h4_bias = data.get("h4_bias")
    zone_type = data.get("zone_type")
    has_liquidity_sweep = data.get("has_liquidity_sweep")
    confirmation = data.get("confirmation")
    rr = float(data.get("rr", 0))

    if daily_bias == h4_bias and daily_bias != "neutral":
        score += 2
        reasons.append("Daily and 4H bias are aligned")
    else:
        warnings.append("Daily and 4H bias are not aligned")

    if zone_type in ["ob", "fvg"]:
        score += 2
        reasons.append("Price is reacting from a valid zone")
    else:
        warnings.append("No strong OB/FVG zone detected")

    if has_liquidity_sweep:
        score += 2
        reasons.append("Liquidity sweep detected")
    else:
        warnings.append("No liquidity sweep detected")

    if confirmation in ["choch", "bos"]:
        score += 3
        reasons.append("Lower timeframe confirmation detected")
    else:
        warnings.append("No CHOCH/BOS confirmation")

    if rr >= 1.5:
        score += 1
        reasons.append("Risk-to-reward is acceptable")
    else:
        warnings.append("Risk-to-reward is weak")

    if score >= 7:
        decision = "trade"
    elif score >= 4:
        decision = "wait"
    else:
        decision = "no_trade"

    return {
        "score": score,
        "decision": decision,
        "reasons": reasons,
        "warnings": warnings,
    }