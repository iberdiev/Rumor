from django.db import models
from django.contrib.auth.models import User

class Rumor(models.Model):

    title = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    pub_date = models.DateTimeField('date_published', auto_now_add = True)
    ratings = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return '%s' % (self.title)
