from django.http.response import FileResponse
from core.model.models import Book
from core.model.utils import ImageUtils
from core.serializers import ImageUtilsSerializer
from wsgiref.util import FileWrapper
from PIL import Image
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
import base64
from difflib import SequenceMatcher


class ListImageUils(APIView):
    """
    View to list all image .
    """

    def get(self, request, type=None):
        """
        Return a list of all users.
        """
        
        if type is not None:
            images = ImageUtils.objects.filter(category__title= type)
        else:
            images = ImageUtils.objects.all()

        urls = [img.image.url for img in images]
        
        return Response(urls)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def upload_ckeditor_image(request, format=None):
    """
    manage ckeditor image.
    """

    file_obj = request.FILES['upload']

    return Response(base64.b64encode(file_obj.read()))
    


class Utils(object):
    """
    Likes Utility
    """
    # Le nombre de likes pour 5 etoiles
    LIKES_ON_TOP = 100

    @staticmethod
    def computed_nb_stars(nbr_likes):
        """
        compute number star from likes
        """
        part = Utils.LIKES_ON_TOP / 5

        return int(nbr_likes/part)

    @staticmethod
    def similar(a, b):
        """" get similarity between 2 string"""
        
        return SequenceMatcher(None, a, b).ratio()


    

    
