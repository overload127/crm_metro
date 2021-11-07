from datetime import datetime

from django.utils.timezone import make_aware

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserProfileSerializer, OkolotokSerializers, TechCardSerializers, DeviceForWorkSerializers, StationSerializers, ReportOfWorkCreateSerializers, RequstReportOfWorkSerializer, ReportOfWorkSerializer
from .models import TechCard, DeviceForWork, Station, ReportOfWork, UserProfile, Okolotok


class UserProfileMe(APIView):
    """Возвращает информацию о авторизованном сотруднике"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = UserProfile.objects.values('id', 'user__id', 'user__first_name', 'okolotok__id', 'okolotok__name').get(user__id=request.user.id)
        serializer = UserProfileSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileAll(APIView):
    """Возвращает информацию о всех сотруднике"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = UserProfile.objects.values('id', 'user__id', 'user__first_name', 'okolotok__id', 'okolotok__name').all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiOkolotok(APIView):
    """Возвращает все варианты околотков"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = Okolotok.objects.all()
        queryset = queryset.values('id', 'name',)
        serializer = OkolotokSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiTechCard(APIView):
    """Возвращает все варианты техкарт"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = TechCard.objects.all()
        serializer = TechCardSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiDeviceForWork(APIView):
    """Возвращает все варианты инструментов и измерительных приборов"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = DeviceForWork.objects.all()
        queryset = queryset.values('id', 'name', 'description')
        serializer = DeviceForWorkSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WikiStation(APIView):
    """Возвращает все варианты станций"""

    # TODO: Настройти и проверить права
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = Station.objects.all()
        queryset = queryset.values('id', 'name', 'short_name')
        serializer = StationSerializers(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceReportOfWork(APIView):
    """Создает выполненый техпроцесс для текущего пользователя"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = ReportOfWorkCreateSerializers(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        query_params = RequstReportOfWorkSerializer.pre_validate(request.query_params)
        reques_serializer = RequstReportOfWorkSerializer(data=query_params) #, read_only=True
        if(reques_serializer.is_valid(raise_exception=True)):
            queryset = reques_serializer.get_queryset_v1()
            serializer = ReportOfWorkSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(reques_serializer.data, status=status.HTTP_400_BAD_REQUEST)

    # Зачатки оптимизации запросов и сериализации для отдачи выполненых работ
    # Планируется 2 варианта решения - через 2 запроса и через 3 запроса с использованием промежуточной таблицы
    # def get_v2(self, request):
    #     reques_serializer = RequstReportOfWorkSerializer(data=request.query_params)
    #     if(reques_serializer.is_valid(raise_exception=True)):
    #         row_queryset = reques_serializer.get_queryset_report_of_work()
    #         tc_queryset = reques_serializer.get_queryset_tech_catd()
    #         serializer = ReportOfWorkSerializer(queryset, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)

    #     return Response(reques_serializer.data, status=status.HTTP_400_BAD_REQUEST)


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

