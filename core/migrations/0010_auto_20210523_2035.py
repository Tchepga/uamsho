# Generated by Django 3.1.5 on 2021-05-23 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20210523_2034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='comments',
            field=models.ManyToManyField(to='core.Comment', verbose_name='Comments'),
        ),
        migrations.AlterField(
            model_name='book',
            name='likes',
            field=models.ManyToManyField(to='core.Likes', verbose_name='Likes'),
        ),
    ]
