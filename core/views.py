from core.serializers import BookSerializer
from core.models import Book
# from rest_framework import viewsets
# from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from django.http import HttpResponse
from django.template import loader


# class BookViewSet(viewsets.ModelViewSet):
#     """
#     A viewset for viewing and editing user instances.
#     """

#     serializer_class = BookSerializer
#     queryset = Book.objects.all()


# router = DefaultRouter()
# router.register(r"book", BookViewSet, basename="user")
# urlpatterns = router.urls

def index(request):
    template = loader.get_template('static/index.html')
    return HttpResponse(template.render(request=request))

urlpatterns = [
    url(r'^$', index)
]
