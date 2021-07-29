from rest_framework import fields, serializers
from core.model.models import Article, Book, Category, Utilisateur
from core.model.utils import ImageUtils
from django.contrib.auth.models import User

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        # fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate')

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"

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

class UtilisateurSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Utilisateur
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'address', 'complement_address']
        
