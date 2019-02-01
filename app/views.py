from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from . forms import RumorCreateForm
from . models import Rumor

from rest_framework.views import APIView
from rest_framework.response import Response
from . serializers import RumorSerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from . permissions import IsOwnerOrReadOnly

@permission_classes((IsAuthenticated, ))
class ApiRumors(APIView):
    def get(self, request):
        rumors = Rumor.objects.all()
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



def HomePage(request):
    rumors = Rumor.objects.all()
    return render(request, 'rumor/index.html', {'rumors': rumors})

def SignUp(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})



@login_required
def RumorCreateView(request):
    if request.method == 'POST':
        form = RumorCreateForm(request.POST)
        if form.is_valid():
            form.save().author = request.user
            form.save()
            return redirect('home')
    else:
        form = RumorCreateForm()
    return render(request, 'rumor/create_rumor.html', {'form': form})
