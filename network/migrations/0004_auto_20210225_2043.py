# Generated by Django 3.1.1 on 2021-02-26 01:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20210225_2004'),
    ]

    operations = [
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=64)),
                ('job', models.CharField(max_length=64)),
                ('bio', models.TextField(max_length=1024)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]