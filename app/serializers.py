# from django.contrib.auth.models import User
# from rest_framework import serializers
#
#
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ('url', 'username')
from rest_framework import serializers
from .models import Rumor

class RumorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rumor
        fields = ('id', 'title', 'description')
