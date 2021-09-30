
from rest_framework import serializers
from core.model.models import (
    Article,
    Book,
    Category,
    Comment,
    Discussion,
    Likes,
    Utilisateur,
)
from core.model.utils import ImageUtils
from django.contrib.auth.models import User


class UtilisateurBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        fields = ("id", "username", "first_name", "last_name", "email")


class CommentSerializer(serializers.ModelSerializer):

    owner = UtilisateurBasicSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id","content", "date_creation","owner", "article", "discussion", "book")

class UtilisateurCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UtilisateurBasicSerializer.Meta.model
        fields = UtilisateurBasicSerializer.Meta.fields + (
            "address",
            "complement_address",
        )


class BookSerializer(serializers.ModelSerializer):
    """Book serializer"""

    comments = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = (
            "id",
            "pk",
            "title",
            "edition",
            "subtitle",
            "description",
            "number_page",
            "date_edition",
            "bibliography",
            "illustration",
            "price",
            "date_creation",
            "ontop",
            "comments",
            "category",
            "author",
            "quantity",
        )
        read_only_fields = ("id", "pk")

    def get_comments(self, obj):
        """get comments of book"""

        return  CommentSerializer(Comment.objects.filter(book=obj), many=True).data


class ArticleSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    author = UtilisateurBasicSerializer(read_only=True)

    class Meta:
        model = Article
        fields = (
            "id",
            "pk",
            "title",
            "subtitle",
            "description",
            "date_creation",
            "ontop",
            "category",
            "author",
        )
        read_only_fields = ("id", "pk")


class ImageUtilsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageUtils
        fields = ["image"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        verbose_name = "Categorie"
        verbose_name_plural = "Categories"


class DebateSerializer(serializers.ModelSerializer):

    author = UtilisateurBasicSerializer(read_only=True)

    class Meta:
        model = Discussion
        fields = (
            "author",
            "comment",
            "content",
            "date_creation",
            "id",
            "illustration",
            "lien_debate",
            "ontop",
            "subject",
        )
        fields = "__all__"
        verbose_name = "Debate"
        verbose_name_plural = "Debates"

class LikeSerializer(serializers.ModelSerializer):
    
    owner = UtilisateurBasicSerializer(read_only=True)
    book = BookSerializer(read_only=True)
    article = ArticleSerializer(read_only=True)
    debate = DebateSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id","owner", "book","article", "debate")
