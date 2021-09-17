from django.contrib.auth import authenticate
from core.model.models import Utilisateur
from rest_framework import viewsets, status

from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.serializers import UtilisateurCompleteSerializer


class UserViewset(viewsets.ViewSet):
    """viewsets pour utilisateurs. Il est géré par firebase"""

    def retrieve_by_email(self, request):
        users = Utilisateur.objects.filter(email=request.GET["email"])
        if len(users) == 0:
            users = None
        else:
            users = users[0]
        serializer = UtilisateurCompleteSerializer(users)
        return Response(serializer.data)

    # def add_panier(self, request):

    #     data = request.data
    #     book = data.get("data", None)

    #     if book is None or book.get("book", None) is None:
    #         return Response(data="data to add into panier must be not null.", status=status.HTTP_400_BAD_REQUEST)
        
    #     id_panier = book.get("book").get("id", None)

    #     if id_panier is None:
    #         return Response(data="data is malformated, id is required.", status=status.HTTP_400_BAD_REQUEST)

    #     # check if already present in cookie
        
    #     response = Response(status=status.HTTP_201_CREATED).set_cookie(key="book" + str(id_panier), value=data, httponly=True)

    #     return response

    # def get_panier(self, request):
        
    #     data = request.COOKIE
       
    #     print(data)

    #     return Response(status=status.HTTP_200_OK)

