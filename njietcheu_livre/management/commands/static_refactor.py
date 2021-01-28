from django.core.management.base import BaseCommand, CommandError
import os

class Command(BaseCommand):
    help = 'move css/js from /static/static to /static'

    def handle(self, *args, **options):
        pass