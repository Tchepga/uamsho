from core.serializers import BookSerializer
from rest_framework import viewsets
from core.model.models import Book
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class BookViewSet(viewsets.ViewSet):

    def list(self, request):
        categorie = request.query_params.get('categorie', None)
        if categorie is None:
            queryset = Book.objects.all().order_by("-add_date")
        else:
            queryset = Book.objects.filter(category__type_category = categorie).order_by("-add_date")
            
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Book.objects.all()
        book = get_object_or_404(queryset, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    
    def ontop(self, request):
        books = Book.objects.filter(ontop=True).order_by('-add_date')
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data) 
