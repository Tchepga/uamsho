""" Book Model's """

from django.utils.translation import ugettext_lazy as _
from django.db import models


class Book(models.Model):
    name = models.CharField(max_length=100)
    titre = models.CharField(max_length=250)
    date_edition = models.DateField(_("date d'édition"))
    bibliography = models.TextField(_("Bibliographie"))
    illustration = models.ImageField(
       _("illustration"),
        upload_to=None,
        height_field=None,
        width_field=None,
        max_length=None,
    )

    def __str__(self):
        return self.name
    
