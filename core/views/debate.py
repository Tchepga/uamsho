from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from core.serializers import DebateSerializer
from rest_framework import viewsets
from core.model.models import Discussion, Utilisateur
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from core.views.utils import Utils
from django.conf import settings
from django.utils import timezone


class DebateViewSet(viewsets.ViewSet):

    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def list(self, request):

        queryset = Discussion.objects.all().order_by("-date_creation")
        serializer = DebateSerializer(queryset, many=True)

        number_page = round(len(queryset) / settings.NUMBER_ELEMENT_BY_PAGE)

        return Response(data={"number_page": number_page, "debates": serializer.data})

    def retrieve(self, request, pk=None):
        queryset = Discussion.objects.all()
        debate = get_object_or_404(queryset, pk=pk)
        serializer = DebateSerializer(debate)
        return Response(serializer.data)

    def ontop(self, request):
        debates = Discussion.objects.filter(ontop=True).order_by("-date_creation")
        serializer = DebateSerializer(debates, many=True)
        return Response(serializer.data)

    def create(self, request):

        data = request.data
        user = data.get("user", None)
        content = data["category"]
        subject = data["subjet"]
        lien_debate = data["lienDebate"]

        user = Utilisateur.objects.filter(email=user.email)
        if len(user) == 0 or subject is None:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                exception=True,
                data="Request malformed!",
            )

        user = user[0]

        if user.is_authenticated:
            Discussion.objects.create(
                user=user,
                content=content,
                subject=subject,
                lien_debate=lien_debate,
                date_creation=timezone.now,
            )
            return Response(status=status.HTTP_201_CREATED)

        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def similary_debate(self, request, pk=None):

        debate = Discussion.objects.get(id=pk)
        debates = []

        for item in Discussion.objects.all():
            if (
                item.id != debate.id
                and (
                    Utils.similar(debate.subject, item.subject)
                    + Utils.similar(debate.content, item.content)
                    + Utils.similar(debate.author.first_name, item.author.first_name)
                    + Utils.similar(debate.author.last_name, item.author.last_name)
                )
                / 4
                >= 0.5
            ):
                debates.append(item)

        serializer = DebateSerializer(debates[:4], many=True)

        return Response(serializer.data)
