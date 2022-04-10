from django.contrib.auth.models import User

def checkPassword(userId, password):
    user = User.objects.get(id = userId)
    return user.check_password(password) 