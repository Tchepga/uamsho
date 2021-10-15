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

        name = data.get("name", None)
        prenom = data.get("prenom", None)
        username = data.get("username", None)
        email = data.get("email", None)
        address = data.get("address", None)
        password = data.get("password", None)
        complement_address = data.get("complementAddress", None)

        # check email format -> regex and if another one existe

        if (
            name is None
            or prenom is None
            or username is None
            or email is None
            or address is None
            or password is None
        ):
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data="Malformed required params to create user",
            )

        Utilisateur.objects.create(
            first_name=prenom,
            last_name=name,
            username=username,
            email=email,
            address=address,
            complement_address=complement_address,
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
