# Generated by Django 2.1.5 on 2019-02-11 05:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_rumorlike'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rumorlike',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='rumorlike',
            name='user',
        ),
        migrations.DeleteModel(
            name='RumorLike',
        ),
    ]
