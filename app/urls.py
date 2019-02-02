from django.urls import path, include
from . import views

urlpatterns = [
    path('rumors/<int:pk>/', views.ApiRumorsDetail.as_view()),
    path('rumors/create/', views.ApiRumorCreate.as_view(), name='create_rumor'),
    path('rumors/<int:pk>/comments/', views.ApiComments.as_view()),
    path('rumors/<int:pk>/comments/create/', views.ApiCommentCreate.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('comments/<int:pk>/', views.ApiCommentsDetail.as_view()),

    path('users', views.UserListView.as_view()),
    path('rumors/', views.ApiRumors.as_view()),

]


## curl -i -H "Accept: application/json" -H "Con/json" http://127.0.0.1:8000/rumors/
## curl -H 'Accept: application/json; indent=4' -u username:psw http:/127.0.0.1:8000/rumors/6/
