from rest_framework import serializers 
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    '''Serializers for User'''
    class Meta:
        model = User
        exclude = ['password']


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=200)

