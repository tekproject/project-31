from django.urls import path
from api import views
from rest_framework.authtoken import views as api_views

urlpatterns = [
    path('', views.home, name='api-home'),
    
    path('all-students', views.userList, name='all-students'),
    path('user-profile', views.profile, name='User-logged'),

    path('get-student-data', views.getStudentdata, name='get-student-data'),
    path('get-student-detail/<int:pk>', views.getStudentdetails, name='get-student-detail'),
    
    path('api-login', views.authToken),
    path('accounts/login/', views.logCheck)
]