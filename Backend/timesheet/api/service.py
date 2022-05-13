from django.contrib.auth.models import User
from api.serializers import AttendanceTrackerSerializer, UserSerializer
from api.models import AttendanceTracker


def generateCode():
    user = User.objects.filter(is_staff = True).first()
    instance = AttendanceTracker.objects.create(user=user)
    serializer = AttendanceTrackerSerializer(instance) 
    return serializer

def checkPassword(userId, password):
    user = User.objects.get(id = userId)
    return user.check_password(password) 

def validRequest(data):
    res = {'is_valid': True, "message": "Account Created"}
    if 'username' not in data or User.objects.filter(username=data.get('username')):
        res = {'is_valid': False, 'message': "Either username not given Or username already in Database"}
    elif 'password' not in data:
        res = {'is_valid': False, 'message': "password not given"}
    elif 'email' not in data or User.objects.filter( email = data.get('email')):
        res = {'is_valid': False, 'message': "Either email not given Or Email Already in Database"}
    return res

