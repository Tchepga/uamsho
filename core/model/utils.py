from django.db import models
from django.utils.translation import ugettext_lazy as _


class CategoryUtils(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title
        
class ImageUtils(models.Model):
    """ Image utils """
    title = models.CharField(max_length=50)
    category = models.ForeignKey("CategoryUtils", verbose_name=_("categorie"), on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.title

