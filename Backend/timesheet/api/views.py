from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import UserSerializer, AuthTokenSerializer
from api.service import checkPassword

@api_view(['GET'])
def home(request):
    '''Default response'''
    response = { "message": "Hello, Welcome to Attendance-Tracker"}
    return Response(response)

@api_view(['POST'])
def authToken(request):
    '''auth token for logging in'''
    serializer = AuthTokenSerializer(data = request.data)
    if serializer.is_valid():
        currentUser = User.objects.filter(username =  request.data.get('username')).first()
        if (currentUser is None):
            return Response({'error': 'Couldnt Authenticate with the given Details'})
        elif(checkPassword(currentUser.id, request.data.get('password'))):
            token, created = Token.objects.get_or_create(user=currentUser)
            serializer = UserSerializer(currentUser, many=False)
            return Response({'token': f'token {token}', 'profile': serializer.data})
        return Response({'error': 'Couldnt Authenticate with the given Details'})
    return Response({'error': serializer.error_messages})

@api_view(['GET'])
def logCheck(request):
    '''Redirect when user not logged'''
    return Response({'message': 'You need to be Logged-In'}, 401)
