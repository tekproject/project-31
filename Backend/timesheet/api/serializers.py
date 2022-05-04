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
        exclude = ['password']


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)

