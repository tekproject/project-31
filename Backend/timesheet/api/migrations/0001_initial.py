# Generated by Django 4.0.1 on 2022-03-26 10:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AttendanceTracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.CharField(choices=[('college', 'college'), ('maths', 'maths'), ('science', 'science'), ('canteen', 'canteen')], default='college', max_length=10)),
                ('qrCodeId', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('checkInTime', models.TimeField(blank=True, null=True)),
                ('checkOutTime', models.TimeField(blank=True, null=True)),
                ('expired', models.BooleanField(default=False)),
                ('checkInStatus', models.BooleanField(default=False)),
                ('checkOutStatus', models.BooleanField(default=False)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='attendance', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
