from django.db import models
from django.contrib.auth.models import User


class Rumor(models.Model):

    title = models.CharField(max_length=300)
    description = models.CharField(max_length=2500)
    pub_date = models.DateTimeField('date_published', auto_now_add = True)
    ratings = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return '%s' % (self.title)

class Comment(models.Model):
    rumor = models.ForeignKey(Rumor, on_delete=models.CASCADE, related_name='comments')
    comment_text = models.CharField(max_length=300)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.comment_text)


# class RumorVote(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     rumor_id = models.ForeignKey(Rumor, on_delete=models.CASCADE, related_name='votes')
#     def __str__(self):
#         return '%s %s' % (self.rumor_id, self,user)
