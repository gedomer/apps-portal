from django.conf import settings

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


class ImageSerializer(serializers.Serializer):
    ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"]
    file = serializers.FileField(allow_empty_file=False)

    def validate_file(self, file):
        if not file.size <= settings.MAX_FILE_SIZE_IN_BYTE:
            raise serializers.ValidationError("Invalid file size.")

        if file.content_type not in self.ALLOWED_IMAGE_TYPES:
            raise serializers.ValidationError("Not allowed file type.")

        return file
