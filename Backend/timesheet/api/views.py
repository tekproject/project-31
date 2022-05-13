from ast import And
from api.models import AttendanceTracker
from django.contrib.auth.models import User
import datetime

from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token
# from rest_framework.authtoken.serializers import AuthTokenSerializer


from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from api.serializers import AttendanceTrackerSerializer, UserSerializer, AuthTokenSerializer
from api.service import generateCode, checkPassword

@api_view(['GET'])
def home(request):
    response = { "message": f'Hello, Welcome to AttendanceTracker'}
    return Response(response)


@api_view(['GET'])
@login_required
@permission_classes([IsAdminUser])
def getCode(request):
    serializer = generateCode()
    return Response(serializer.data , status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@login_required
def checkIn(request):
    
    data = request.data
    date = datetime.datetime.now().date()

    try:
        user = User.objects.get(id=request.user.id)
        instance = AttendanceTracker.objects.get(qrCodeId=data['qrCodeId'])
        sessionActive = AttendanceTracker.objects.filter(user = request.user.id, checkInStatus=True, checkOutStatus=False).exclude(date = date, place = 'college')
        collegeEntryValidation = AttendanceTracker.objects.filter(user = request.user.id, place = 'college', checkInStatus= True, checkOutStatus= False, date = date)

    except:
        response = {'message':'This is not valid QR code'}
        return Response(response)

    if instance.expired:
        response = {'message':'This QR code is expired'}
        return Response(response)
    
    elif sessionActive:
        response = {'message':'Please Check-Out from Active Sessions'}
        return Response(response)

    elif not collegeEntryValidation and not data['place'] == 'college':
        response = {'message':'Please Check-In first with college QR'}
        return Response(response)
    
    elif collegeEntryValidation and data['place'] == 'college':
        response = {'message':'You already have Active Sessions for College'}
        return Response(response)

    elif(instance.user.is_staff):
        serializer = AttendanceTrackerSerializer(instance=instance, data=data)
        if serializer.is_valid():
            serializer.save()

            instance.user = user
            instance.expired = True
            instance.save()
            
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    response = {'message':'This QR code is already Taken, Please Try with new QR Code after Refresh'}

    return Response(response)

@api_view(['PUT'])
@login_required
def checkOut(request):
    instance = AttendanceTracker.objects.get(qrCodeId=request.data['qrCodeId'])
    serializer = AttendanceTrackerSerializer(instance=instance, data=request.data)
    if serializer.is_valid():
        serializer.save()

    response = {'message':'Check Out Successfully'}
    return Response(response)
        

@api_view(['GET'])
@login_required
@permission_classes([IsAdminUser])
def checkExpiry(request, pk):
    instance = AttendanceTracker.objects.get(id=pk)
    response = {'expired': 'false'}
    if instance.expired:
        response['expired']= 'true'
    return Response(response)


@api_view(['PUT'])
@login_required
@permission_classes([IsAdminUser])
def makeExpiry(request, pk):
    instance = AttendanceTracker.objects.get(id=pk)
    instance.expired = True
    instance.save()

    serializer = generateCode()
    return Response(serializer.data , status=status.HTTP_201_CREATED)


@api_view(['GET'])
@login_required
def profile(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@login_required
def getStudentdetails(request):
    if(request.GET.get('id')):
        instance = AttendanceTracker.objects.filter(user=request.GET.get('id'))
        serializer = AttendanceTrackerSerializer(instance, many=True)
        return Response(serializer.data)
    res = {'error': "Need an Query String 'id'"}
    return Response(res, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@login_required
@permission_classes([IsAdminUser])
def userList(request):
    user = User.objects.filter(is_staff=False)
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def authToken(request):
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
    return Response({'message': 'You need to be Logged-In'}, 401)
