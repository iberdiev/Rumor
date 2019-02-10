from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rumor, Comment
from rest_framework.authtoken.models import Token

class RumorSerializer(serializers.ModelSerializer):

    author_token = serializers.SerializerMethodField('get_token')
    def get_token(self, rumor):
      return Token.objects.get(user_id=rumor.author).key

    class Meta:
        model = Rumor
        fields = ('id', 'title', 'description','author_token')

class CommentSerializer(serializers.ModelSerializer):

    author_token = serializers.SerializerMethodField('get_token')
    def get_token(self, comment):
      return Token.objects.get(user_id=comment.author).key

    class Meta:
        model = Comment
        fields = ('rumor', 'comment_text', 'id', 'author_token')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
