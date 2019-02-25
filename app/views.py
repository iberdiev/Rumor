from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from . forms import RumorCreateForm
from . models import Rumor, Comment
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from . serializers import RumorSerializer, CommentSerializer, UserSerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from . permissions import IsOwnerOrReadOnly

@permission_classes((IsAuthenticated, ))
class ApiRumors(APIView):

    def get(self, request):
        rumors = Rumor.objects.all().order_by('id')
        data = RumorSerializer(rumors, many=True).data
        return Response(data)

@permission_classes((IsAuthenticated, IsOwnerOrReadOnly))
class ApiRumorsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rumor.objects.all()
    serializer_class = RumorSerializer

@permission_classes((IsAuthenticated, ))
class ApiRumorCreate(generics.ListCreateAPIView):
    queryset = Rumor.objects.all()
    serializer_class = RumorSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


@permission_classes((IsAuthenticated, IsOwnerOrReadOnly))
class ApiCommentsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

@permission_classes((IsAuthenticated, ))
class ApiComments(APIView):
    def get(self, request, pk):
        comments = Rumor.objects.get(pk=pk).comments.order_by('id')
        data = CommentSerializer(comments, many=True).data
        return Response(data)

@permission_classes((IsAuthenticated, ))
class ApiCommentCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
