from core.model.models import Book
from core.serializers import ImageUtilsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from core.model.utils import *
from PIL import Image

class ListImageUils(APIView):
    """
    View to list all image .
    """

    def get(self, request, type=None):
        """
        Return a list of all users.
        """
        # category = request.GET['type'] or None
        if type is not None:
            images = ImageUtils.objects.filter(category__title= type)
        else:
            images = ImageUtils.objects.all()

        urls = [img.image.url for img in images]
        
        return Response(urls)

class Utils(object):
    """
    Likes Utility
    """
    # Le nombre de likes pour 5 etoiles
    LIKES_ON_TOP = 100

    """
        compute number star from likes
    """
    @staticmethod
    def computed_nb_stars(nbr_likes):
        part = Utils.LIKES_ON_TOP / 5

        return int(nbr_likes/part)


    

    
