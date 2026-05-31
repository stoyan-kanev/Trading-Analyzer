from django.urls import path
from .views import EvaluateSetupView, TradeAnalysisListCreateView, TradeAnalysisDetailView

urlpatterns = [
    path("evaluate/", EvaluateSetupView.as_view(), name="evaluate-setup"),
    path("", TradeAnalysisListCreateView.as_view(), name="create-analysis"),

    path("<int:pk>/", TradeAnalysisDetailView.as_view(), name="analysis-detail"),
]
