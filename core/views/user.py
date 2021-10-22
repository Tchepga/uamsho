from django.contrib.auth import authenticate
from core.model.models import Utilisateur
from rest_framework import viewsets, status

from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.serializers import UtilisateurCompleteSerializer
import re
from django.db.models import Q

def set_user_from_request(data) -> Utilisateur:
        
        user = Utilisateur
        user.last_name = data.get("nom", None)
        user.first_name = data.get("prenom", None)
        user.username = data.get("username", None)
        user.email = data.get("email", None)
        user.address = data.get("address", None)
        user.password = data.get("password", None)
        user.complement_address = data.get("complementAddress", None)

        return user

class UserViewset(viewsets.ViewSet):
    """viewsets pour utilisateurs. Il est géré par firebase"""

    def retrieve_by_email(self, request):
        users = Utilisateur.objects.filter(email=request.GET["email"])
        if len(users) == 0:
            users = None
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            users = users[0]
            if users.is_authenticated:
                serializer = UtilisateurCompleteSerializer(users)
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    

    def add_user(self, request):
        data = request.data
        
        utilisateur = set_user_from_request(data)

        # check email format -> regex and if another one existe
        email_match = re.search("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$", utilisateur.email)
        password_match = re.search("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}", utilisateur.password)
        
        if password_match is None or email_match is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, data="INVALID_INFORMATION") 

        users = Utilisateur.objects.filter(Q(email=utilisateur.email) | Q(username=utilisateur.username))

        if len(users) != 0:
            return Response(status=status.HTTP_409_CONFLICT, data="USER_ALREADY_EXISTS")                       

        if (
            utilisateur.last_name is None
            or utilisateur.first_name is None
            or utilisateur.username is None
            or utilisateur.email is None
            or utilisateur.address is None
            or utilisateur.password is None
        ):
            print(utilisateur)
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data="Malformed required params to create user",
            )

        Utilisateur.objects.create(
            first_name=utilisateur.last_name,
            last_name=utilisateur.first_name,
            username=utilisateur.username,
            email=utilisateur.email,
            address=utilisateur.address,
            complement_address=utilisateur.complement_address,
        )

        return Response(status=status.HTTP_201_CREATED)

    def update_user(self, request):
        data = request.data

        name = data.get("name", None)
        email = data.get("email", None)
        prenom = data.get("firstName", None)
        username = data.get("username", None)
        address = data.get("address", None)
        complement_address = data.get("addressComplement", None)

        if email is not None:
            user = Utilisateur.objects.get(email=email)
            if user.is_authenticated:
                if name is not None:
                    user.first_name = prenom

                if prenom is not None:
                    user.last_name = name

                if username is not None:
                    user.username = username

                if address is not None:
                    user.address = address

                if complement_address is not None:
                    user.complement_address = complement_address

                user.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)

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
