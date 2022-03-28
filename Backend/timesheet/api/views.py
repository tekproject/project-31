from ast import Not
from api.models import AttendanceTracker
from django.contrib.auth.models import User
import datetime

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
def checkIn(request):
    
    data = request.data
    
    try:
        instance = AttendanceTracker.objects.get(qrCodeId=data['qrCodeId'])
    except:
        response = {'message':'This is not valid QR code'}
        return Response(response)

    qrCodeInstance = AttendanceTracker.objects.filter(user = request.user.id, checkInStatus=True, checkOutStatus=False).exclude(place = 'college')
    
    date = datetime.datetime.now().date()
    
    collegeValidation = AttendanceTracker.objects.filter(user = request.user.id, place = 'college', checkIn= True, checkOut= False, date = date)

    collegeCheckoutValidation = AttendanceTracker.objects.filter(user = request.user.id, place = 'college', checkOut= False).exclude(date = date)


    if(instance.expired):
        response = {'message':'This QR code is expired'}
        return Response(response)
    
    elif(qrCodeInstance):
        response = {'message':'Please Check-Out your Last Entry'}
        return Response(response)

    elif(collegeValidation is None):
        response = {'message':'Please Check-In first with college QR'}
        return Response(response)

    elif(collegeCheckoutValidation):
        response = {'message':'Please Check-Out your Last Entry in college QR'}
        return Response(response)


    elif(instance.user.is_staff):
        serializer = AttendanceTrackerSerializer(instance=instance, data=data)
        if serializer.is_valid():
            serializer.save()

            instance.expired = True
            instance.save()
            
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

@api_view(['PUT'])
def checkOut(request):
    instance = AttendanceTracker.objects.get(qrCodeId=request.data['qrCodeId'])
    serializer = AttendanceTrackerSerializer(instance=instance, data=request.data)
    if serializer.is_valid():
        serializer.save()

    response = {'message':'Check Out Successfully'}
    return Response(response)
        

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
