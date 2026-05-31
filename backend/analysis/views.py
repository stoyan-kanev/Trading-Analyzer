from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import TradeAnalysis
from .serializers import TradeAnalysisSerializer
from .services import evaluate_setup

from django.shortcuts import get_object_or_404

class EvaluateSetupView(APIView):
    permission_classes = [IsAuthenticated]

    # permission_classes = [AllowAny]  Test without auth


    def post(self, request):
        serializer = TradeAnalysisSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = evaluate_setup(serializer.validated_data)

        return Response(result)

class TradeAnalysisListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        analyses = TradeAnalysis.objects.filter(user=request.user).order_by("-created_at")
        serializer = TradeAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TradeAnalysisSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = evaluate_setup(serializer.validated_data)

        analysis = serializer.save(
            user=request.user,
            score=result["score"],
            decision=result["decision"],
            reasons=result["reasons"],
            warnings=result["warnings"],
        )

        return Response(TradeAnalysisSerializer(analysis).data, status=201)


class TradeAnalysisDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        return get_object_or_404(TradeAnalysis, pk=pk, user=request.user)

    def get(self, request, pk):
        analysis = self.get_object(request, pk)
        serializer = TradeAnalysisSerializer(analysis)
        return Response(serializer.data)

    def put(self, request, pk):
        analysis = self.get_object(request, pk)

        serializer = TradeAnalysisSerializer(
            analysis,
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        result = evaluate_setup(serializer.validated_data)

        updated_analysis = serializer.save(
            score=result["score"],
            decision=result["decision"],
            reasons=result["reasons"],
            warnings=result["warnings"],
        )

        return Response(TradeAnalysisSerializer(updated_analysis).data)

    def delete(self, request, pk):
        analysis = self.get_object(request, pk)
        analysis.delete()

        return Response(status=204)