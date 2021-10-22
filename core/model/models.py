""" Book Model's """

from django.db.models.fields.related import ManyToManyField
from django.db.models.fields.reverse_related import ManyToOneRel
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone


def validate_file_size(value):
        file_size = value.size

        if file_size > 20965760:
            raise ValidationError("The maximum file size that can be upload is 20 Mo")
        else:
            return value


class Utilisateur(User):
    """ Model utilisateur """
    class Meta:
        verbose_name = 'Utilisateur'

    address = models.CharField(max_length=150)
    complement_address = models.CharField(max_length=15, blank=True, null=True)

    

    def __str__(self) -> str:
        return self.username

class Book(models.Model):
    """ Book model """
    title = models.CharField(_("titre") ,max_length=250)
    edition = models.CharField(max_length=100, null=True, blank=True)
    subtitle = models.CharField(_("sous-titre"), null=True, blank=True, max_length=250)
    description = models.TextField(_("description"), blank=True, null=True)
    number_page = models.IntegerField(_("nombre de page"), default=0)
    date_edition = models.DateField(_("date d'édition"), default=timezone.now)
    bibliography = models.TextField(_("Bibliographie"), blank=True, null=True)
    illustration = models.ImageField(
        _("illustration"),
        upload_to=None,
        height_field=None,
        width_field=None,
        max_length=None,
    )
    price = models.IntegerField(default=0)
    date_creation = models.DateField(default=timezone.now)

    #utils field
    ontop = models.BooleanField(default=False)
    add_date = models.DateField(default=timezone.now)

    # foreign field
    category = models.ForeignKey("core.Category", verbose_name=_("categorie"), on_delete=models.SET_NULL, null=True)
    author = models.CharField(max_length=150, null=False)
    ifile = models.FileField(upload_to='static', null=True , validators=[validate_file_size], max_length=500)

    def __str__(self):
        return self.title
    
    


class Likes(models.Model):
    """ Like's book. The value is between 0-5 """
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    article = models.ForeignKey("core.Article", on_delete=models.SET_NULL, null=True)
    discussion = models.ForeignKey("core.Discussion", on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey("core.Book", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(f'{self.owner} - {self.book} - {self.article} - {self.discussion}')


class Comment(models.Model):
    """ Comment's book """
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content =  models.CharField(max_length=200)

    article = models.ForeignKey("core.Article", on_delete=models.SET_NULL, null=True ,blank=True)
    discussion = models.ForeignKey("core.Discussion", on_delete=models.SET_NULL, null=True ,blank=True)
    book = models.ForeignKey("core.Book", on_delete=models.SET_NULL, null=True ,blank=True)

    date_creation = models.DateField(default=timezone.now)

    def __str__(self):
        return self.content[0:20] 


class Category(models.Model):
    """ Categorie's Book, Article."""
    type_category = models.CharField(_("categorie"), max_length=100)

    def __str__(self):
        return self.type_category

class Article(models.Model):
    """ Article """
    title = models.CharField(_("titre"), max_length=50)
    subtitle = models.CharField(_("sous-titre"), null=True, blank=True, max_length=250)
    description = models.TextField()
    date_creation = models.DateField( default=timezone.now)
    ontop = models.BooleanField(default=False)
    
    category = models.ForeignKey("core.Category", verbose_name=_("categorie"), on_delete=models.SET_NULL, null=True)
    
    author = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title


class Discussion(models.Model):
    """ Debate Model """
    subject = models.CharField(_("sujet"), max_length=250)
    illustration = models.ImageField(
        _("illustration"),
        upload_to=None,
        height_field=None,
        width_field=None,
        max_length=None,
        null=True,
        blank=True
    )
    content = models.TextField()
    ontop = models.BooleanField(default=False)

    lien_debate = models.CharField(_("Lien de vision"), null=True, blank=True, max_length=500)
    date_debut_reunion = models.DateField()
    date_fin_reunion = models.DateField()
    
    author = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True)

    date_creation = models.DateField( default=timezone.now)

    def __str__(self):
        return self.subject

class Facture(models.Model):
    """ Facture model"""

    identifiant = models.IntegerField()
    list_articles = models.ManyToManyField(Book)
    totalHT = models.IntegerField()
    tva = models.IntegerField()
    totalTTC = models.IntegerField()
    date_creation = models.DateField(default=timezone.now)

    client = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.identifiant = self.id

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.identifiant
        



