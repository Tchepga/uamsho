from re import S
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response

from core.model.models import Book, Facture, Utilisateur
from core.serializers import FactureSerializer


class PaymentViewSets(viewsets.ModelViewSet):

    def retrieve(self, request):
        email = request.query_params.get("email", None)

        user = Utilisateur.objects.filter(email=email)
        if len(user) == 0:
            return Response(
                status=status.HTTP_403_FORBIDDEN
            )
        
        if user[0].is_authenticated:
            factures = Facture.objects.filter(client__id= user[0].id)
            serializer = FactureSerializer(factures, many=True)
            return Response(serializer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):

        data = request.data
        book_infos = data.get("booksInfo")
        email = data.get("email")
        total_HT = data.get("totalHT")
        total_TTC = data.get("totalTTC")
        tva = data.get("tva")

        user = Utilisateur.objects.filter(email=email)
        if len(user) == 0:
            return Response(
                status=status.HTTP_403_FORBIDDEN
            )

        user = user[0]

        if user.is_authenticated:
            facture = Facture.objects.create(
                tva = tva,
                totalHT = total_HT,
                totalTTC = total_TTC,
            )
            

            for book_info in book_infos:
                book = Book.objects.get(id=book_info.split("_")[0])
                print(book)
                facture.list_articles.add(book)
            
            book.save()

            return Response(status=status.HTTP_201_CREATED)

        else:
            return Response(status=status.HTTP_403_FORBIDDEN)