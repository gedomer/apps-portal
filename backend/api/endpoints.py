from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView as BaseAPIView


class Endpoint(BaseAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


class LoginAPIView(ObtainAuthToken):
    pass


class AppListEndpoint(Endpoint):

    def get(self, request):
        return Response({"detail": "Basarili"})
