from uuid import uuid4
from pathlib import Path

from django.conf import settings
from PIL import Image


class ImageConvertService:

    @classmethod
    def convert(cls, img, target_format, folder):
        image = Image.open(img)
        image = image.convert("RGB")

        folder_path = f"{settings.MEDIA_ROOT}/{folder}"
        Path(folder_path).mkdir(parents=True, exist_ok=True)

        file_name = f"converted_{uuid4().hex}.{target_format}"
        full_path = f"{folder_path}/{file_name}"
        image.save(full_path, target_format)
        return file_name
