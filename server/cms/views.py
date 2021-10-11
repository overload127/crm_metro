from rest_framework import viewsets

from .models import ProfileUser
from .serializers import ProfileUserSerializers


# ViewSets define the view behavior.
class ProfileUserViewSet(viewsets.ModelViewSet):
    queryset = ProfileUser.objects.all()
    serializer_class = ProfileUserSerializers

