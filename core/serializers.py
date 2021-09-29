
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
        fields = ("id", "username", "first_name", "last_name")


class CommentSerializer(serializers.ModelSerializer):

    owner = UtilisateurBasicSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id","content", "date_creation","owner", "article", "discussion", "book")

class UtilisateurCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UtilisateurBasicSerializer.Meta.model
        fields = UtilisateurBasicSerializer.Meta.fields + (
            "email",
            "address",
            "complement_address",
        )


class BookSerializer(serializers.ModelSerializer):
    """Book serializer"""

    nbre_stars = serializers.SerializerMethodField()
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
            "nbre_stars",
            "comments",
            "category",
            "author",
            "quantity",
        )
        read_only_fields = ("id", "pk")

    def get_nbre_stars(self, obj):

        """
        compute number star from likes
        """

        moyen = 0
        likes = Likes.objects.filter(book=obj)

        if likes is not None:
            likes = [like.number_likes for like in likes.all()]
            if len(likes) != 0:
                moyen = sum(likes) / len(likes)

        return moyen

    def get_comments(self, obj):
        """get comments of book"""

        return  CommentSerializer(Comment.objects.filter(book=obj), many=True).data


class ArticleSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    nbre_stars = serializers.SerializerMethodField()
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
            "nbre_stars",
            "author",
        )
        read_only_fields = ("id", "pk")

    def get_nbre_stars(self, obj):

        """
        compute number star from likes
        """

        moyen = 0
        likes = Likes.objects.filter(article=obj)

        if likes is not None:
            likes = [like.number_likes for like in likes.all()]
            if len(likes) != 0:
                moyen = sum(likes) / len(likes)

        return moyen


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
            "likes",
            "ontop",
            "subject",
        )
        fields = "__all__"
        verbose_name = "Debate"
        verbose_name_plural = "Debates"


