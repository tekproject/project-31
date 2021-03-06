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