from django.conf import settings
from django.db import models


class TradeAnalysis(models.Model):
    class Bias(models.TextChoices):
        BULLISH = "bullish", "Bullish"
        BEARISH = "bearish", "Bearish"
        NEUTRAL = "neutral", "Neutral"

    class Session(models.TextChoices):
        LONDON = "london", "London"
        NEW_YORK = "new_york", "New York"
        ASIA = "asia", "Asia"

    class ZoneType(models.TextChoices):
        OB = "ob", "Order Block"
        FVG = "fvg", "Fair Value Gap"
        SUPPORT_RESISTANCE = "support_resistance", "Support / Resistance"
        NONE = "none", "None"

    class Confirmation(models.TextChoices):
        CHOCH = "choch", "CHOCH"
        BOS = "bos", "BOS"
        NONE = "none", "None"

    class Decision(models.TextChoices):
        TRADE = "trade", "Trade"
        WAIT = "wait", "Wait"
        NO_TRADE = "no_trade", "No Trade"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trade_analyses"
    )

    pair = models.CharField(max_length=20)

    analysis_time = models.DateTimeField(auto_now_add=True)

    daily_bias = models.CharField(
        max_length=20,
        choices=Bias.choices
    )

    h4_bias = models.CharField(
        max_length=20,
        choices=Bias.choices
    )

    session = models.CharField(
        max_length=20,
        choices=Session.choices
    )

    zone_type = models.CharField(
        max_length=30,
        choices=ZoneType.choices
    )

    has_liquidity_sweep = models.BooleanField(default=False)

    confirmation = models.CharField(
        max_length=20,
        choices=Confirmation.choices
    )

    rr = models.DecimalField(
        max_digits=4,
        decimal_places=2
    )

    score = models.PositiveSmallIntegerField(default=0)

    decision = models.CharField(
        max_length=20,
        choices=Decision.choices
    )

    reasons = models.JSONField(default=list)
    warnings = models.JSONField(default=list)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pair} - {self.decision}"