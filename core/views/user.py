
from core.model.models import Utilisateur
from rest_framework import viewsets

from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.serializers import UtilisateurSerializer

class UserViewset(viewsets.ViewSet):
    """viewsets pour utilisateurs. Pas d'authenfication, il est géré par firebase"""

    def retrieve_by_email(self, request):
        users = Utilisateur.objects.filter(email=request.GET['email'])
        if len(users) == 0:
            users=None
        else :
            users=users[0]
        serializer = UtilisateurSerializer(users)
        return Response(serializer.data)