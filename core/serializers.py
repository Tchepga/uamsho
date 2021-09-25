import inspect
from rest_framework import fields, serializers
from core.model.models import Article, Book, Category, Discussion, Utilisateur
from core.model.utils import ImageUtils
from django.contrib.auth.models import User
import json
import base64

class UtilisateurBasicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Utilisateur
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'    
        fields=('id', 'username','first_name', 'last_name')

class UtilisateurCompleteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UtilisateurBasicSerializer.Meta.model
        fields = UtilisateurBasicSerializer.Meta.fields + ('email', 'address', 'complement_address')
    

class BookSerializer(serializers.ModelSerializer):
    """ Book serializer """
    
    nbre_stars = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = ('id', 'pk', 'title', 'edition', 'subtitle', 'description', 'number_page',
            'date_edition', 'bibliography', 'illustration', 'price', 'date_creation',
            'ontop', 'nbre_stars', 'comments', 'category', 'author', 'quantity')
        read_only_fields=('id', 'pk')


    def get_nbre_stars(self, obj):

        """
            compute number star from likes
        """

        moyen=0
        likes = obj.likes
        
       
        if likes is not None:
            likes =[ like.number_likes for like in likes.all()]
            if len(likes) != 0:
                moyen = sum(likes)/len(likes)      

        return moyen
       

class ArticleSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    nbre_stars = serializers.SerializerMethodField()
    author = UtilisateurBasicSerializer(read_only=True)


    class Meta:
        model = Article
        fields = ('id', 'pk', 'title', 'subtitle', 'description', 'date_creation',
            'ontop', 'category', 'nbre_stars','author')
        read_only_fields=('id', 'pk')

    
    def get_nbre_stars(self, obj):
    
        """
            compute number star from likes
        """

        moyen=0
        likes = obj.likes
        
       
        if likes is not None:
            likes =[ like.number_likes for like in likes.all()]
            if len(likes) != 0:
                moyen = sum(likes)/len(likes)      

        return moyen

class ImageUtilsSerializer(serializers.ModelSerializer):
    
    class Meta:
       model = ImageUtils
       fields = ["image"]

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"
        verbose_name = 'Categorie'
        verbose_name_plural = 'Categories'

class DebateSerializer(serializers.ModelSerializer):

    author = UtilisateurBasicSerializer(read_only=True)
    
    class Meta:
        model = Discussion
        fields = ('author', 'comment', 'content', 'date_creation', 'id', 'illustration', 'lien_debate', 'likes', 'ontop', 'subject')
        fields = "__all__"
        verbose_name = 'Debate'
        verbose_name_plural = 'Debates'
