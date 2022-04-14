from rest_framework import serializers

from core.models import MobileApp, Screenshot


class ScreenshotSerializer(serializers.ModelSerializer):
    file = serializers.CharField(source="file.url")

    class Meta:
        model = Screenshot
        fields = ["id", "file"]


class MobileAppSerializer(serializers.ModelSerializer):
    screenshots = ScreenshotSerializer(many=True)

    class Meta:
        model = MobileApp
        fields = ["id", "name", "screenshots", "logo"]
