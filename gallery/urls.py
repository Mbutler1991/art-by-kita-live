from django.urls import path
from .views import PaintingListView, PaintingDetailView, RandomHeaderPaintingView

app_name = 'gallery'

urlpatterns = [
    path('api/paintings/', PaintingListView.as_view(), name='painting-list'),
    path('api/random-header-painting/', RandomHeaderPaintingView.as_view(), name='random-header-painting'),
    path('api/paintings/<int:pk>/', PaintingDetailView.as_view(), name='painting-detail'),
]
