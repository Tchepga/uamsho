from core.serializers import BookSerializer
from rest_framework import viewsets
from core.model.models import Book, Comment, Utilisateur
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from core.views.utils import Utils
from django.conf import settings


class BookViewSet(viewsets.ViewSet):
    def list(self, request):
        categorie = request.query_params.get("categorie", None)
        if categorie is None:
            queryset = Book.objects.all().order_by("-add_date")
        else:
            queryset = Book.objects.filter(category__type_category=categorie).order_by(
                "-add_date"
            )

        serializer = BookSerializer(queryset, many=True)

        number_page = round(len(queryset) / settings.NUMBER_ELEMENT_BY_PAGE)

        return Response(data={"number_page": number_page, "books": serializer.data})

    def retrieve(self, request, pk=None):
        queryset = Book.objects.all()
        book = get_object_or_404(queryset, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def ontop(self, request):
        books = Book.objects.filter(ontop=True).order_by("-add_date")
        serializer = BookSerializer(books, many=True)

        return Response(serializer.data)

    def similary_book(self, request, pk=None):

        book = Book.objects.get(id=pk)
        books = []

        for item in Book.objects.all():
            if (
                item.id != book.id
                and (
                    Utils.similar(book.title, item.title)
                    + Utils.similar(book.description, item.description)
                    + Utils.similar(
                        book.category.type_category, item.category.type_category
                    )
                    + Utils.similar(book.bibliography, item.bibliography)
                    + Utils.similar(book.author, item.author)
                    + Utils.similar(str(book.price), str(item.price))
                )
                / 6
                >= 0.5
            ):
                books.append(item)

        serializer = BookSerializer(books[:4], many=True)

        return Response(serializer.data)

    def add_comment(self, request, pk=None):
        
        content = request.data.get("content", None)
        email = request.data.get("email", None)

        if email is not None and content is not None and pk is not None:
            book = Book.objects.get(id=pk)
            user = Utilisateur.objects.get(email=email)

            if user.is_authenticated:
                comment = Comment()
                comment.content = content
                comment.owner = user
                comment.book = book
                comment.save()

            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_200_OK)
