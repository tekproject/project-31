from api.models import AttendanceTracker
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from api.serializers import AttendanceTrackerSerializer, UserSerializer
from api.service import generateCode


@api_view(['GET'])
def home(request):
    user = request.user.first_name
    response = { "message": f'Hello {user}, Welcome to AttendanceTracker'}
    return Response(response)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCode(request):
    serializer = generateCode()
    return Response(serializer.data , status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def postAttendance(request): 

    data = request.data

    instance = AttendanceTracker.objects.get(barcodeId=data['barcodeId'])

    if(instance.expired):
        response = {'message':'This is QR code is expired'}
        return Response(response)

    if(instance.user.is_staff):
        serializer = AttendanceTrackerSerializer(instance=instance, data=data)
        if serializer.is_valid():
            serializer.save()
            instance.expired = True
            instance.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([IsAdminUser])
def checkExpiry(request, pk):
    instance = AttendanceTracker.objects.get(id=pk)
    response = {'expired': 'false'}
    if instance.expired:
        response['expired']= 'true'
    return Response(response)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def makeExpiry(request, pk):
    instance = AttendanceTracker.objects.get(id=pk)
    instance.expired = True
    instance.save()

    serializer = generateCode()
    return Response(serializer.data , status=status.HTTP_201_CREATED)


@api_view(['GET'])
def profile(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getStudentdetails(request, pk):
    instance = AttendanceTracker.objects.filter(user=pk)
    serializer = AttendanceTrackerSerializer(instance, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def userList(request):
    user = User.objects.filter(is_staff=False)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)
