from core.serializers import BookSerializer
from core.models import Book
from rest_framework import viewsets
from rest_framework.routers import DefaultRouter

class BookViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = BookSerializer
    queryset = Book.objects.all()


router = DefaultRouter()
router.register(r'book', BookViewSet, basename='user')
urlpatterns = router.urls
