from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from . forms import RumorCreateForm
from . models import Rumor

def HomePage(request):
    rumors = Rumor.objects.all()
    return render(request, 'rumor/index.html', {'rumors': rumors})

def ApiRumors(request):
    rumors = Rumor.objects.all()
    data = {"results": list(rumors.values("title","description","pub_date","author"))}
    return JsonResponse(data)

def ApiRumorsDetail(request, pk):
    rumor = get_object_or_404(Rumor, pk=pk)
    data = {"results": {
                        "title": rumor.title,
                        "description": rumor.description,
                        "pub_date": rumor.pub_date,
                        "author": rumor.author.username,
                       }
           }
    return JsonResponse(data)

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
