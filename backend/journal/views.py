from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Trade
from .serializers import TradeSerializer


class TradeListCreateView(generics.ListCreateAPIView):
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Trade.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TradeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Trade.objects.filter(user=self.request.user)

class TradeByAnalysisView(RetrieveAPIView):
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        analysis_id = self.kwargs.get("analysis_id")

        try:
            return Trade.objects.get(
                analysis_id=analysis_id,
                user=self.request.user
            )
        except Trade.DoesNotExist:
            raise NotFound("Trade not found for this analysis.")