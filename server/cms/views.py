# from rest_framework import viewsets

# from .models import ProfileUser
# from .serializers import ProfileUserSerializer

# from django.http import HttpResponseRedirect
# from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import TPTypeWorkSerializers, StationSerializers
from .models import TPTypeWork, Station


# class ProfileUserViewSet(viewsets.ModelViewSet):
#     queryset = ProfileUser.objects.all()
#     serializer_class = ProfileUserSerializer

# @api_view(['GET'])
# def current_user(request):
#     """
#     Determine the current user by their token, and return their data
#     """
    
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)


class public_test(APIView):
    """
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        # q = TPTypeWork.objects.all()
        # serializer = TPTypeWorkSerializers(q)
        return Response({"details": "public_test"}, status=status.HTTP_200_OK)


class private_test(APIView):
    """
    """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        # q = TPTypeWork.objects.all()
        # serializer = TPTypeWorkSerializers(q)
        return Response({"details": "private_test"}, status=status.HTTP_200_OK)


class WikiTP(APIView):
    """Возвращает все варианты техпроцессов"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = TPTypeWork.objects.all()
        queryset = queryset.values('id', 'code', 'name', 'du46')
        
        serializer = TPTypeWorkSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiStation(APIView):
    """Возвращает все варианты станций"""

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = Station.objects.all()
        queryset = queryset.values('id', 'name', 'short_name')
        
        serializer = StationSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
