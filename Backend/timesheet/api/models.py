import uuid
import datetime

from django.db import models
from django.contrib.auth.models import User


PLACE_TYPE = (('college','college'),('maths','maths'),('science','science'),('canteen','canteen'))

class AttendanceTracker(models.Model):
    place = models.CharField(
       max_length=10,
       choices= PLACE_TYPE,
       default='college'
    )
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING , blank=True, related_name='attendance')
    qrCodeId = models.UUIDField(default=uuid.uuid4, unique=True)
    date =  models.DateField(blank=True, null=True)
    checkInTime =  models.TimeField(blank=True, null=True)
    checkOutTime =  models.TimeField(blank=True, null=True)
    expired = models.BooleanField(default=False)
    checkInStatus = models.BooleanField(default=False)
    checkOutStatus = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.qrCodeId}'
        