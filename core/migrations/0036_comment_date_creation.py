# Generated by Django 3.1.5 on 2021-09-28 17:25

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0035_auto_20210927_2256'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='date_creation',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
