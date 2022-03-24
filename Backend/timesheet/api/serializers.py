from rest_framework import serializers 
from .models import AttendanceTracker
from django.contrib.auth.models import User
# import django.contrib.auth.password_validation as validators
# from django.core import exceptions



class AttendanceTrackerSerializer(serializers.ModelSerializer):
    '''Serializers for Attendance'''
    class Meta:
        model = AttendanceTracker
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    '''Serializers for User'''
    class Meta:
        model = User
        fields = '__all__'