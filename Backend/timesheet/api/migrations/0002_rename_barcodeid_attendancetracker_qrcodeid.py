# Generated by Django 4.0.1 on 2022-03-25 19:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='attendancetracker',
            old_name='barcodeId',
            new_name='qrCodeId',
        ),
    ]