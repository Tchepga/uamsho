# Generated by Django 3.1.5 on 2021-05-24 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20210524_1528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageutils',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
