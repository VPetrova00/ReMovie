from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User


# Create your views here.

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('email')
    serializer_class = UserSerializer
