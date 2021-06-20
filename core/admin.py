# todos/admin.py
from django.contrib import admin

from core.model.models import Book, Comment, Likes, Article, Discussion, Category
from core.model.utils import ImageUtils, CategoryUtils

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'add_date', 'ontop')
    read_only = ('add_date')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date_creation',  'ontop')

admin.site.register(Comment)
admin.site.register(Likes)
admin.site.register(Discussion)
admin.site.register(Category)
admin.site.register(CategoryUtils)
admin.site.register(ImageUtils)

