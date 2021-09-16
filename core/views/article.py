from core.serializers import ArticleSerializer
from rest_framework import viewsets, status
from core.model.models import Book, Article, Category, Utilisateur
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class ArticleViewSet(viewsets.ViewSet):

    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def list(self, request):
        categorie = request.query_params.get("categorie", None)
        email = request.query_params.get("email", None)
        username = request.query_params.get("username", None)
        filter_param = request.query_params.get("filter", None)

        if categorie is None:
            queryset = Article.objects.all().order_by("-date_creation")
        else:
            queryset = Article.objects.filter(
                category__type_category=categorie
            ).order_by("-date_creatsion")

        if username is not None and email is not None:
             # get author
            author = Utilisateur.objects.get(email=email, username=username)
            queryset = queryset.filter(author=author)
            
        if filter_param == "FAVORIS":
            queryset = queryset.filter(likes__owner=author)

        serializer = ArticleSerializer(queryset, many=True)
        number_page = round(len(queryset) / settings.NUMBER_ELEMENT_BY_PAGE)

        return Response({"articles": serializer.data, "numberPage": number_page})

    def retrieve(self, request, pk=None):
        queryset = Article.objects.all()
        articles = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(articles)
        return Response(serializer.data)

    def ontop(self, request):
        articles = Article.objects.filter(ontop=True).order_by("-date_creation")
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def create(self, request):
        if request.data is not None:
            data = request.data
            user = data.get("user", None)
            category = data["category"]

            # categorie
            if category is None or len(Category.objects.filter(id=category)) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Category with " + category + " malformed!",
                )

            categ = Category.objects.get(id=category)
            if user is not None:
                authen_user = Utilisateur.objects.get(username=user["username"])

                if authen_user.is_authenticated:

                    Article.objects.create(
                        title=data.get('title', ''), subtitle=data.get('subtitle', ''), description=data.get('description', ''),
                        category=categ, author=authen_user
                        )

        return Response(status=status.HTTP_201_CREATED)
