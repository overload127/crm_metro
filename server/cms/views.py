# from rest_framework import viewsets

# from .models import ProfileUser
# from .serializers import ProfileUserSerializer

# from django.http import HttpResponseRedirect
# from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import TPTypeWorkSerializers, StationSerializers, ReportOfWorkSerializersIn, AdvandedReportOfWorkSerializersIn
from .models import TPTypeWork, Station, ReportOfWork, ProfileUser


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
    """Возвращает все варианты техкарт"""

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


class UserTPWorkCreate(APIView):
    """Создает выполненый техпроцесс для текущего пользователя"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = ReportOfWorkSerializersIn(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            try:
                profile_user = ProfileUser.objects.get(user_site=request.user)
            except ProfileUser.ObjectDoesNotExist:
                return Response({'profile_user': 'Пользователь не найден. Возможно он был удален или обратитесь к администрации.'}, status=status.HTTP_400_BAD_REQUEST)

            new_tp_work = serializer.create(serializer.data, user=profile_user)
            if not new_tp_work:
                return Response({'error': 'Возникла ошибка во время создания записи.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class AdminTPWorkCreate(APIView):
    """Создает выполненый техпроцесс для любого пользователя"""

    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = AdvandedReportOfWorkSerializersIn(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            try:
                profile_user = ProfileUser.objects.get(user_site_id=request.data.profile_user_id)
            except ProfileUser.ObjectDoesNotExist:
                return Response({'profile_user': 'Пользователь не найден. Возможно он был удален или обратитесь к администрации.'}, status=status.HTTP_400_BAD_REQUEST)

            new_tp_work = serializer.create(serializer.data, user=profile_user)
            if not new_tp_work:
                return Response({'error': 'Возникла ошибка во время создания записи.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
