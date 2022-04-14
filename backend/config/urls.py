from django.conf import settings
from django.urls import path, include

from api.endpoints import AppDetailEndpoint, AppListEndpoint, LoginEndpoint, ImageConvertEndpoint

api_urls = [
    path("app-list/", AppListEndpoint.as_view()),
    path("app-list/<int:pk>/", AppDetailEndpoint.as_view()),
    path("convert/", ImageConvertEndpoint.as_view()),
    path("login/", LoginEndpoint.as_view()),
]

urlpatterns = [
    path("api/", include(api_urls)),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
