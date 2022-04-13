from django.urls import path, include

from api.endpoints import AppListAPIView

api_urls = [
    path('app-list/', AppListAPIView.as_view()),
]

urlpatterns = [
    path("api/", include(api_urls)),
]
