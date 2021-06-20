from core.serializers import ImageUtilsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from core.model.utils import *

class ListImageUils(APIView):
    """
    View to list all image utils.

    * Requires category.
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