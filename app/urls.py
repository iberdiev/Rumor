from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePage, name = 'home'),             ## curl -i -H "Accept: application/json" -H "Con/json" http://127.0.0.1:8000/rumors/
    path('rumors/', views.ApiRumors),                    ## Data can be accessed through GET method http://127.0.0.1:8000/rumors/
    path('rumors/<int:pk>/', views.ApiRumorsDetail),     ## http://127.0.0.1:8000/rumors/pk(id)/
    path('signup/', views.SignUp, name='signup'),
    path('rumors/create/', views.RumorCreateView, name='create_rumor'),

]
