from core.serializers import ArticleSerializer
from rest_framework import viewsets
from core.model.models import Book, Article, Category
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class ArticleViewSet(viewsets.ViewSet):

    def list(self, request):
        categorie = request.query_params.get('categorie', None)
        if categorie is None:
            queryset = Article.objects.all().order_by("-date_creation")
        else:
            queryset = Article.objects.filter(category__type_category = categorie).order_by("-date_creation")
            
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Article.objects.all()
        Article = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(Article)
        return Response(serializer.data)
    
    def ontop(self, request):
        articles = Article.objects.filter(ontop=True).order_by('-date_creation')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data) 

    def add(self, request):
        if request.data is not None:
            data = request.data
            Article.objects.create(
                title=data.get('title', ''), subtitle=data.get('subtitle', ''), description=data.get('description', ''),
                category_id=data.get('category', '')
                )
