# Generated by Django 3.1.1 on 2021-03-01 02:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_auto_20210228_2122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follow',
            name='follow',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
