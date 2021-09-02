import inspect
from rest_framework import fields, serializers
from core.model.models import Article, Book, Category, Utilisateur
from core.model.utils import ImageUtils
from django.contrib.auth.models import User
#from rest_framework.utils import json
import json
import base64
    

class BookSerializer(serializers.ModelSerializer):
    """ Book serializer """
    
    nbre_stars = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = ('id', 'pk', 'title', 'edition', 'subtitle', 'description', 'number_page',
            'date_edition', 'bibliography', 'illustration', 'price', 'date_creation',
            'ontop', 'nbre_stars', 'comments', 'category', 'author')
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
        
