from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.model.models import Book, Article
from core.serializers import BookSerializer, ArticleSerializer

class ListSearch(APIView):

    """ search ressources(books, articles, debate) """

    def get(self, request, format=None):

        scope = request.GET['scope']
        input_search= request.GET['inputSearch']
        books = []
        articles = []

        if "book" in scope:
            books = BookSerializer(Book.objects.filter(title__contains=input_search), many=True)
        
        if "article" in scope:
            articles = ArticleSerializer(Article.objects.filter(title__contains=input_search), many=True)



        return Response({ "books" : books.data, "articles": articles.data})