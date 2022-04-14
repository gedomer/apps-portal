from django.shortcuts import get_object_or_404
from django.db.models import Prefetch

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView as BaseAPIView

from core.models import MobileApp, Screenshot
from .serializers import MobileAppSerializer


class Endpoint(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class LoginAPIView(ObtainAuthToken):
    pass


class AppListEndpoint(Endpoint):

    def get(self, request):
        response = MobileApp.objects.all().values('id', 'name')
        return Response(response)


class AppDetailEndpoint(Endpoint):

    def get(self, request, pk):
        qset = Screenshot.objects.all()
        mobile_app = get_object_or_404(MobileApp.objects.prefetch_related(
            Prefetch("screenshot_set", queryset=qset, to_attr="screenshots")
        ), pk=pk)
        serializer = MobileAppSerializer(mobile_app)
        return Response(serializer.data)
