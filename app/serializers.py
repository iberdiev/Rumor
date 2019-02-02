from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rumor, Comment

class RumorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rumor
        fields = ('id', 'title', 'description')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('rumor', 'comment_text', 'id')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
