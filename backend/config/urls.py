from django.urls import path, include

from api.endpoints import AppListEndpoint, LoginAPIView

api_urls = [
    path("app-list/", AppListEndpoint.as_view()),
    path("login/", LoginAPIView.as_view()),
]

urlpatterns = [
    path("api/", include(api_urls)),
]
