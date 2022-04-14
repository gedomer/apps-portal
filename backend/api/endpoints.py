from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django.conf import settings

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView as BaseAPIView
from rest_framework.parsers import MultiPartParser, FileUploadParser

from core.models import MobileApp, Screenshot
from core.services import ImageConvertService
from .serializers import MobileAppSerializer, ImageSerializer



class Endpoint(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class LoginEndpoint(ObtainAuthToken):
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


class ImageConvertEndpoint(Endpoint):
    parser_class = (MultiPartParser, FileUploadParser,)

    def post(self, request):
        serializer = ImageSerializer(data=request.FILES)

        if serializer.is_valid():
            file = serializer.validated_data["file"]
            target_folder = "converted_images"

            try:
                file_name = ImageConvertService.convert(file, "webp", target_folder)
            except Exception:
                return Response({"result": "An error occurred during the converting."})

            return Response({"result": f"{settings.MEDIA_URL}{target_folder}/{file_name}"})

        return Response(serializer.errors, status=400)
