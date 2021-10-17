# Generated by Django 3.1.5 on 2021-10-16 19:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0042_auto_20211015_1421'),
    ]

    operations = [
        migrations.CreateModel(
            name='Facture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifiant', models.IntegerField()),
                ('totalHT', models.IntegerField()),
                ('tva', models.IntegerField()),
                ('totalTTC', models.IntegerField()),
                ('date_creation', models.DateField(default=django.utils.timezone.now)),
                ('list_articles', models.ManyToManyField(to='core.Book')),
            ],
        ),
    ]
