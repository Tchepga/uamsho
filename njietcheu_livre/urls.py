"""njietcheu_livre URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from core.views.like import LikeViewSet
from core.views.debate import DebateViewSet
from core.views.payment import PaymentViewSets
from core.views.user import UserViewset
from core.views.category import CategoryViewSet
from core.views.article import ArticleViewSet
from core.views.book import BookViewSet
from core.views.utils import ListImageUils, upload_ckeditor_image
from core.views.search import ListSearch
from django.contrib import admin
from django.urls import path, include, re_path
from core.views.pages import urlpatterns as core_routes
from django.conf import settings
from django.conf.urls.static import static

# from django.http import HttpResponse
# from django.shortcuts import render, redirect

# from django.contrib.auth.decorators import login_required
# from django.http import Http404
# from django.views.static import serve
# from django.conf import settings
# from django.urls import path
from functools import partial

# def catch_all(request, path="index.html"):
#     """Renvoie index.html en cas de 404, uniquement pour DEBUG=True ou TESTING=True.

#     On ne connaît pas les routes du front. En prod, c'est apache qui envoie l'index.
#     """
#     try:
#         return serve(request, path=path, document_root=settings.STATIC_ROOT)
#     except Http404:
#         return serve(request, path="index.html", document_root=settings.STATIC_ROOT)
#     except OSError:
#         # Sur windows, on a une erreur lors de l'acces a /connexion/machin:machin
#         return serve(request, path="index.html", document_root=settings.STATIC_ROOT)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(core_routes)),
    path("api/utils/images/<str:type>", ListImageUils.as_view()),
    path("api/book/", BookViewSet.as_view({"get": "list"})),
    path("api/book/<int:pk>", BookViewSet.as_view({"get": "retrieve"})),
    path("api/book/ontop", BookViewSet.as_view({"get": "ontop"})),
    path("api/book/<int:pk>/similar", BookViewSet.as_view({"get": "similary_book"})),
    path("api/book/<int:pk>/add-comment", BookViewSet.as_view({"post": "add_comment"})),
    path("api/article", ArticleViewSet.as_view({"get": "list", "post": "create"})),
    path("api/article/<int:pk>", ArticleViewSet.as_view({"get": "retrieve"})),
    path("api/article/ontop", ArticleViewSet.as_view({"get": "ontop"})),
    path("api/article", ArticleViewSet.as_view({"get": "list", "post": "create"})),
    path("api/categories", CategoryViewSet.as_view({"get": "list"})),
    path(
        "api/user",
        UserViewset.as_view(
            {"get": "retrieve_by_email", "post": "add_user", "patch": "update_user"}
        ),
    ),
    path("api/search", ListSearch.as_view()),
    path("api/upload/ckeditor-image", upload_ckeditor_image),
    path("api/debate", DebateViewSet.as_view({"get": "list"})),
    path("api/debate/<int:pk>", DebateViewSet.as_view({"get": "retrieve"})),
    path("api/debate/ontop", DebateViewSet.as_view({"get": "ontop"})),
    path(
        "api/debate/<int:pk>/similar", DebateViewSet.as_view({"get": "similary_debate"})
    ),
    path("api/like", LikeViewSet.as_view({"post": "create"})),
    path("api/like/retrieve", LikeViewSet.as_view({"get": "retrieve"})),
    path("api/like/<int:pk>", LikeViewSet.as_view({"delete": "delete"})),
    path("api/facture/simul-payment", PaymentViewSets.as_view({"post": "create"})),
    path("api/facture", PaymentViewSets.as_view({"get": "retrieve"})),
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)  # to access public static directory

# if settings.DEBUG:
#     """En production, les fichiers statiques pourraient être distribués différement .
#     """
#     urlpatterns += [
#         path(f"{settings.MEDIA_URL.lstrip('/')}<path:path>", partial(serve, document_root=settings.MEDIA_ROOT)),
#         path(f"{settings.STATIC_URL.lstrip('/')}<path:path>", partial(serve, document_root=settings.STATIC_ROOT)),
#         path("", catch_all),
#         path("<path:path>", catch_all),
#     ]
