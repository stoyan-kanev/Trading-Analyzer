from django.urls import path
from .views import EvaluateSetupView, TradeAnalysisListCreateView, TradeAnalysisDetailView, TradeAnalysisStatsView

urlpatterns = [
    path("evaluate/", EvaluateSetupView.as_view(), name="evaluate-setup"),
    path("", TradeAnalysisListCreateView.as_view(), name="analysis-list-create"),
    path("<int:pk>/", TradeAnalysisDetailView.as_view(), name="analysis-detail"),

    path("get-stats/", TradeAnalysisStatsView.as_view(), name="analysis-stats"),

]
