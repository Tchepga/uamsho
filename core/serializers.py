from rest_framework import fields, serializers
from core.model.models import Article, Book
from core.model.utils import ImageUtils


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
            
        
