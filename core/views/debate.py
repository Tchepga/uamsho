from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from core.serializers import DebateSerializer
from rest_framework import viewsets
from core.model.models import Discussion
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from core.views.utils import Utils
from django.conf import settings

class DebateViewSet(viewsets.ViewSet):

    authentication_classes = [SessionAuthentication, BasicAuthentication]
    
    def list(self, request):

        queryset = Discussion.objects.all().order_by("-date_creation")    
        serializer = DebateSerializer(queryset, many=True)

        number_page=round(len(queryset)/settings.NUMBER_ELEMENT_BY_PAGE)

        return Response(data={'number_page':number_page , 'debates': serializer.data})

    def retrieve(self, request, pk=None):
        queryset = Discussion.objects.all()
        debate = get_object_or_404(queryset, pk=pk)
        serializer = DebateSerializer(debate)
        return Response(serializer.data)
    
    def ontop(self, request):
        debates = Discussion.objects.filter(ontop=True).order_by('-date_creation')
        serializer = DebateSerializer(debates, many=True)
        return Response(serializer.data) 

    
    def create(self, request):
        pass
