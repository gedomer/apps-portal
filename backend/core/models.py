import os

from django.db import models


def icon_file_path(instance, filename):
    return os.path.join("mobile_app_icons", filename)


def screenshot_file_path(instance, filename):
    return os.path.join("screenshot_files", filename)


class MobileApp(models.Model):
    name = models.CharField(max_length=150)
    logo = models.FileField(upload_to=icon_file_path)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Screenshot(models.Model):
    mobileapp = models.ForeignKey(MobileApp, on_delete=models.CASCADE)
    file = models.FileField(upload_to=screenshot_file_path)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
