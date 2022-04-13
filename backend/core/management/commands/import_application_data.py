import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from core.models import MobileApp, Screenshot


class Command(BaseCommand):
    help = "This command will import data from csv"

    def add_arguments(self, parser):
        parser.add_argument(
            "--folder",
            type=str,
            help="specify path to uploaded files to import",
        )

    def _read_csv(self, path):
        output = []
        with open(path, newline="") as csvfile:
            reader = csv.DictReader(csvfile, delimiter=",")
            for row in reader:
                output.append(row)
        return output

    def handle(self, *args, **options):
        folder_path = options.get("folder")

        if not Path(folder_path).exists():
            self.stdout.write(self.style.ERROR("Folder is not exist."))
            return

        required_folders_and_files = [
            "icons",
            "ss",
            "sample_apps.csv",
            "sample_screeshots.csv",
        ]
        for f in required_folders_and_files:
            expected_path = Path(folder_path) / f
            if not expected_path.exists():
                self.stdout.write(self.style.ERROR("File or folder is not exist."))
                return

        app_data = self._read_csv(Path(folder_path) / "sample_apps.csv")
        app_data = {i.pop('id'): i  for i in app_data}

        mobile_apps = {}
        for key, item in app_data.items():
            icon = item.pop('icon')
            mobile_app = MobileApp(**item)
            mobile_app.save()

            mobile_apps[key] = mobile_app.id

            try:
                icon_file = open(Path(folder_path) / "icons" / icon, "rb")
                mobile_app.logo.save(icon, icon_file)
            except FileNotFoundError as exc:
                raise exc

        screenshot_data = self._read_csv(Path(folder_path) / "sample_screeshots.csv")
        for ss in screenshot_data:
            ss.pop('id')
            app_id = ss.pop('app_id')
            file_name = ss.pop('file_name')
            screenshot = Screenshot(**ss)
            screenshot.mobileapp_id = mobile_apps[app_id]
            screenshot.save()

            try:
                ss_file = open(Path(folder_path) / "ss" / file_name, "rb")
                screenshot.file.save(file_name, ss_file)
            except FileNotFoundError as exc:
                raise exc

        self.stdout.write(self.style.SUCCESS("Import successful."))
