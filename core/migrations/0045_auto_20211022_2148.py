# Generated by Django 3.1.5 on 2021-10-22 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0044_facture_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilisateur',
            name='complement_address',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
