# Generated by Django 2.1.5 on 2019-02-11 05:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0007_auto_20190211_1141'),
    ]

    operations = [
        migrations.CreateModel(
            name='RumorVote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rumor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='app.Rumor')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]