from django.urls import path
from api import views

urlpatterns = [
    path('', views.home, name='api-home'),
    
    path('api-login', views.authToken),
    path('accounts/login/', views.logCheck)
]