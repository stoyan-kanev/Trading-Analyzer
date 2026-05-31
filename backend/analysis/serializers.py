from rest_framework import serializers
from .models import TradeAnalysis


class TradeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = TradeAnalysis
        fields = "__all__"
        read_only_fields = [
            "user",
            "score",
            "decision",
            "reasons",
            "warnings",
            "created_at",
            "updated_at",
        ]