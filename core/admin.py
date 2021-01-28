# todos/admin.py
from django.contrib import admin

from core.models import Book, Comment, Likes, Article, Discussion

admin.site.register(Book)
admin.site.register(Comment)
admin.site.register(Likes)
admin.site.register(Article)
admin.site.register(Discussion)
