# Generated by Django 3.1.5 on 2021-05-23 19:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_date_edition'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryUtils',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ImageUtils',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.categoryutils', verbose_name='categorie')),
            ],
        ),
    ]