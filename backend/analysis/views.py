from django.db.models.functions import Cast
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q, Avg, FloatField
from .models import TradeAnalysis
from .serializers import TradeAnalysisSerializer
from .services import evaluate_setup


class EvaluateSetupView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TradeAnalysisSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = evaluate_setup(serializer.validated_data)

        return Response(result)


class TradeAnalysisListCreateView(generics.ListCreateAPIView):
    serializer_class = TradeAnalysisSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TradeAnalysis.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        result = evaluate_setup(serializer.validated_data)

        serializer.save(
            user=self.request.user,
            score=result["score"],
            decision=result["decision"],
            reasons=result["reasons"],
            warnings=result["warnings"],
        )


class TradeAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TradeAnalysisSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TradeAnalysis.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        result = evaluate_setup(serializer.validated_data)

        serializer.save(
            score=result["score"],
            decision=result["decision"],
            reasons=result["reasons"],
            warnings=result["warnings"],
        )


class TradeAnalysisStatsView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TradeAnalysisSerializer

    def get(self, request):
        analyses = TradeAnalysis.objects.filter(user=request.user)

        stats = analyses.aggregate(
            total_analyses=Count("id"),
            trade_decisions=Count("id", filter=Q(decision="trade")),
            wait_decisions=Count("id", filter=Q(decision="wait")),
            no_trade_decisions=Count("id", filter=Q(decision="no_trade")),
            avg_score=Avg("score"),
            avg_rr=Avg(Cast("rr", FloatField())),
        )

        total = stats["total_analyses"] or 0
        trade_decisions = stats["trade_decisions"] or 0

        analysis_stats = {
            "total_analyses": total,
            "trade_decisions": trade_decisions,
            "wait_decisions": stats["wait_decisions"] or 0,
            "no_trade_decisions": stats["no_trade_decisions"] or 0,
            "trade_decision_rate": round((trade_decisions / total) * 100, 2) if total else 0,
            "avg_score": round(stats["avg_score"] or 0, 2),
            "avg_rr": round(stats["avg_rr"] or 0, 2),
        }

        decision_breakdown = [
            {
                "decision": "trade",
                "count": analysis_stats["trade_decisions"],
            },
            {
                "decision": "wait",
                "count": analysis_stats["wait_decisions"],
            },
            {
                "decision": "no_trade",
                "count": analysis_stats["no_trade_decisions"],
            },
        ]

        session_performance = list(
            analyses
            .values("session")
            .annotate(count=Count("id"))
            .order_by("-count")
        )

        recent_analyses = analyses.order_by("-created_at")[:5]
        recent_analyses_serializer = TradeAnalysisSerializer(
            recent_analyses,
            many=True
        )

        return Response({
            "stats": analysis_stats,
            "decision_breakdown": decision_breakdown,
            "session_performance": session_performance,
            "recent_analyses": recent_analyses_serializer.data,
        })
