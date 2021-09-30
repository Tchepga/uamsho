from core.serializers import ArticleSerializer, LikeSerializer
from rest_framework import viewsets, status
from core.model.models import Book, Article, Category, Discussion, Likes, Utilisateur
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class LikeViewSet(viewsets.ViewSet):

    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def retrieve(self, request):

        email = request.query_params.get("email", None)
        
        if email is not None:
            user = Utilisateur.objects.get(email = email)
            queryset = Likes.objects.filter(owner_id=user.id).order_by("-id")
            serializer = LikeSerializer(queryset, many=True)
            return Response(serializer.data)

        return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Parameters are required!",
                )
         

    def create(self, request):
        if request.data is not None:
            data = request.data
            email = data.get("email", None)
            instance = data["instance"]
            type_instance = data["typeInstance"]
            users = Utilisateur.objects.filter(email=email)
        
            # categorie
            if instance is None or len(users) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Malformed request!",
                )

            user = Utilisateur.objects.get(email=email)

            if user.is_authenticated:
                like = Likes()
                
                if type_instance == "book":
                    like.book = Book.objects.get(id=instance)
                if type_instance == "article":
                    like.article = Article.objects.get(id=instance)
                if type_instance == "debate":
                    like.discussion = Discussion.objects.get(id=instance)
                
                like.owner = user

                like.save()

                return Response(status=status.HTTP_201_CREATED)
        
        return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Malformed request, parameters are required!",
                )
    
    def delete(self, request, pk=None):
        if request.data is not None:
            email = request.query_params.get("email", None)

            likes = Likes.objects.filter(id=pk)
            if pk is None or len(Utilisateur.objects.filter(email=email)) == 0 or len(likes) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Malformed request!",
                )

            user = Utilisateur.objects.get(email=email)

            if user.is_authenticated:
                likes.delete()

                return Response(status=status.HTTP_202_ACCEPTED)
        
        return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    exception=True,
                    data="Malformed request, parameters are required!",
                )
