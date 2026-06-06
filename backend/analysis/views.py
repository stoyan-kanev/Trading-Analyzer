from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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