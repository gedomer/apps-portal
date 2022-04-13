from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView as BaseAPIView


class Endpoint(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class AppListAPIView(Endpoint):

    def get(self, request):
        return Response({"detail": "Basarili"})