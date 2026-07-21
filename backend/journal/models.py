from django.conf import settings
from django.db import models

from analysis.models import TradeAnalysis


class Trade(models.Model):
    RESULT_CHOICES = [
        ("win", "Win"),
        ("loss", "Loss"),
        ("breakeven", "Breakeven"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trades"
    )

    analysis = models.OneToOneField(
        TradeAnalysis,
        on_delete=models.CASCADE,
        related_name="trade"
    )

    entry_price = models.DecimalField(max_digits=12, decimal_places=5)
    stop_loss = models.DecimalField(max_digits=12, decimal_places=5)
    take_profit = models.DecimalField(max_digits=12, decimal_places=5)

    result = models.CharField(max_length=20, choices=RESULT_CHOICES)
    profit_loss_r = models.DecimalField(max_digits=5, decimal_places=2)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)