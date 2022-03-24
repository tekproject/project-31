from django.urls import path
from api import views
from rest_framework.authtoken import views as api_views

urlpatterns = [
    path('', views.home, name='api-home'),
    
    path('all-students', views.userList, name='all-students'),
    path('user-profile', views.profile, name='User-logged'),

    path('generate-code', views.getCode, name='get-QR-code'),
    path('submit-code', views.postAttendance, name='post-QR-code'),
    path('validate-code/<int:pk>', views.checkExpiry, name='validate-QR-code'),
    path('expire-code/<int:pk>', views.makeExpiry, name='Expire-QR-code'),
    
    path('get-student-detail/<int:pk>', views.getStudentdetails, name='get-student-detail'),
    
    path('api-login', api_views.obtain_auth_token)
]