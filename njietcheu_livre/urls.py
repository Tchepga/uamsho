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
from django.contrib import admin
from django.urls import path, include, re_path
from core.views import urlpatterns as core_routes

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
    path('admin/', admin.site.urls),
    path('', include(core_routes))
]

# if settings.DEBUG:
#     """En production, les fichiers statiques pourraient être distribués différement .
#     """
#     urlpatterns += [
#         path(f"{settings.MEDIA_URL.lstrip('/')}<path:path>", partial(serve, document_root=settings.MEDIA_ROOT)),
#         path(f"{settings.STATIC_URL.lstrip('/')}<path:path>", partial(serve, document_root=settings.STATIC_ROOT)),
#         path("", catch_all),
#         path("<path:path>", catch_all),
#     ]
