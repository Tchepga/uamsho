# Generated by Django 3.1.5 on 2021-05-30 10:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_book_ontop'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='add_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
