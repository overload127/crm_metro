from datetime import datetime

from django.utils.timezone import make_aware

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import OkolotokSerializers, TechCardSerializers, DeviceForWorkSerializers, StationSerializers, ReportOfWorkCreateSerializers, RequstReportOfWorkSerializer, ReportOfWorkSerializers_for_fast_query
from .models import TechCard, DeviceForWork, Station, ReportOfWork, UserProfile, Okolotok


class WikiOkolotok(APIView):
    """Возвращает все варианты околотков"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = Okolotok.objects.all()
        queryset = queryset.values('id', 'name',)
        serializer = OkolotokSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiTechCard(APIView):
    """Возвращает все варианты техкарт"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = TechCard.objects.all()
        queryset = queryset.values('id', 'code', 'name', 'description', 'du46', 'order', 'device_for_work__name')
        serializer = TechCardSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiDeviceForWork(APIView):
    """Возвращает все варианты инструментов и измерительных приборов"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = DeviceForWork.objects.all()
        queryset = queryset.values('id', 'name', 'description')
        serializer = DeviceForWorkSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiStation(APIView):
    """Возвращает все варианты станций"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = Station.objects.all()
        queryset = queryset.values('id', 'name', 'short_name')
        serializer = StationSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceReportOfWork(APIView):
    """Создает выполненый техпроцесс для текущего пользователя"""

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = ReportOfWorkCreateSerializers(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        reques_serializer = RequstReportOfWorkSerializer(data=request.query_params)
        if(reques_serializer.is_valid(raise_exception=True)):
            queryset = reques_serializer.get_queryset()
            queryset = queryset.values(
                'id',
                'date_start',
                'date_end',
                'station__name',
                'station__short_name',
                'type_work__code',
                'type_work__name',
                'type_work__du46',
                'type_work__order',
                'note',
                'subdivision',)
            serializer = ReportOfWorkSerializers_for_fast_query(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(reques_serializer.data, status=status.HTTP_400_BAD_REQUEST)














# class ReportOfWork(APIView):
#     """Создает выполненый техпроцесс для текущего пользователя"""

#     permission_classes = (permissions.IsAuthenticated,)

#     def post(self, request):
#         serializer = ReportOfWorkSerializersCreate(data=request.data)
#         if(serializer.is_valid(raise_exception=True)):
#             try:
#                 user_profile = UserProfile.objects.values('id', 'okolotok_id').get(user=request.user)
#             except UserProfile.DoesNotExistи:
#                 print("ЛОГ - Не удалось найти объект UserProfile")
#                 return Response({
#                     'status': 'error',
#                     'UserProfile': 'Пользователь не найден'
#                 }, status=status.HTTP_400_BAD_REQUEST)
    
#             new_report_of_work = serializer.create(serializer.data, userprofile_id=user_profile.id, okolotok_id=user_profile.okolotok_id)
#             if not new_report_of_work:
#                 return Response({
#                     'status': 'error',
#                     'ReportOfWork': 'Не удалось создать объект'
#                 }, status=status.HTTP_400_BAD_REQUEST)

#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         serializer = RequstReportOfWorkSerializer(data=request.query_params)
#         if(serializer.is_valid(raise_exception=True)):
#             datas_start = make_aware(datetime.strptime(serializer.data['date_start'], "%Y-%m-%d"))
#             date_end = make_aware(datetime.strptime(serializer.data['date_end'], "%Y-%m-%d"))
#             datas_start = datas_start.replace(hour=0, minute=0, second=0, microsecond=0)
#             date_end = date_end.replace(hour=23, minute=59, second=59, microsecond=0)

#             queryset = ReportOfWork.objects.all()

#             if(serializer.data['okolotok_id'] != -1):
#                 queryset = queryset.filter(profile_user__okolotok_id=serializer.data['okolotok_id'])

#             if(serializer.data['station_id'] != -1):
#                 queryset = queryset.filter(station_id=serializer.data['station_id'])

#             queryset = serializer.TYPE_WORK_CHOICES[serializer.data['type_du']](queryset)

#             queryset = queryset.filter(date_start__range=[datas_start, date_end]).values('id', 'date_start', 'date_end', 'note', 'subdivision', 'station__name', 'station__short_name', 'type_work__code', 'type_work__du46')
#             queryset = queryset.order_by('date_start')
#             serializer_answer = ReportOfWorkSerializers_for_fast_query(queryset, many=True)
#             return Response({'type': serializer.data['type_du'], 'data': serializer_answer.data}, status=status.HTTP_200_OK)

#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)












################################################
#
# Не нужные и тестовые методы и классы
#
################################################

# class private_test(APIView):
#     """"""

#     permission_classes = (permissions.IsAuthenticated,)

#     def get(self, request, format=None):
#         # q = TechCard.objects.all()
#         # serializer = TechCardSerializers(q)
#         return Response({"details": "private_test"}, status=status.HTTP_200_OK)


# class public_test(APIView):
#     """"""
#     permission_classes = (permissions.AllowAny,)

#     def get(self, request, format=None):
#         # q = TechCard.objects.all()
#         # serializer = TechCardSerializers(q)
#         return Response({"details": "public_test"}, status=status.HTTP_200_OK)


# class AdminTPWorkCreate(APIView):
#     """Создает выполненый техпроцесс для любого пользователя"""

#     # permission_classes = (permissions.IsAdminUser,)
#     permission_classes = (permissions.IsAuthenticated,)

#     def post(self, request):
#         serializer = AdvandcedReportOfWorkSerializersIn(data=request.data)
#         if(serializer.is_valid(raise_exception=True)):
#             try:
#                 profile_user = UserProfile.objects.get(user_site_id=request.data.profile_user_id)
#             except UserProfile.ObjectDoesNotExist:
#                 return Response({'profile_user': 'Пользователь не найден. Возможно он был удален или обратитесь к администрации.'}, status=status.HTTP_400_BAD_REQUEST)

#             new_tp_work = serializer.create(serializer.data, user=profile_user)
#             if not new_tp_work:
#                 return Response({'error': 'Возникла ошибка во время создания записи.'}, status=status.HTTP_400_BAD_REQUEST)

#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

