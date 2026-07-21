from rest_framework import serializers
from .models import Trade, TradeAnalysis


class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = "__all__"
        read_only_fields = [
            "user",
            "created_at",
            "updated_at",
        ]

    def validate_analysis(self, analysis):
        request = self.context.get("request")

        if request and analysis.user != request.user:
            raise serializers.ValidationError(
                "You cannot create a trade for another user's analysis."
            )

        return analysis