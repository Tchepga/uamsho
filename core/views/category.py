from rest_framework import viewsets


from core.serializers import CategorySerializer
from rest_framework import viewsets
from core.model.models import Category
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)