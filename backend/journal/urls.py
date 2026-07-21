from django.urls import path
from .views import TradeListCreateView, TradeDetailView, TradeByAnalysisView

urlpatterns = [
    # existing analysis urls...

    path("", TradeListCreateView.as_view(), name="trade-list-create"),
    path("<int:pk>/", TradeDetailView.as_view(), name="trade-detail"),
    path("by-analysis/<int:analysis_id>/", TradeByAnalysisView.as_view(), name="trade-by-analysis"),

]