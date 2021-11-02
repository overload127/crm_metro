from django.contrib.auth.models import User
from rest_framework import serializers
# from rest_framework_jwt.settings import api_settings
from .models import ReportOfWork, TechCard, Station, Okolotok, UserProfile, DeviceForWork


class OkolotokSerializers(serializers.ModelSerializer):
    """"""
    
    class Meta:
        model = Okolotok
        fields = ('id', 'name',)
        read_only_fields = ('id', 'name',)


class DeviceForWorkSerializers(serializers.ModelSerializer):
    """"""
    class Meta:
        model = DeviceForWork
        fields = ('id', 'name', 'description',)
        read_only_fields = ('id', 'name', 'description',)


class TechCardSerializers(serializers.ModelSerializer):
    """"""
    device_for_work__name = serializers.CharField(max_length=200, allow_blank=False)

    class Meta:
        model = TechCard
        fields = (
            'id',
            'code',
            'name',
            'description',
            'du46',
            'order',
            'device_for_work__name',)
        read_only_fields = (
            'id',
            'code',
            'name',
            'description',
            'du46',
            'order',
            'device_for_work__name',)


class StationSerializers(serializers.ModelSerializer):
    """"""
    
    class Meta:
        model = Station
        fields = ('id', 'name', 'short_name',)
        read_only_fields = ('id', 'name', 'short_name',)


class ReportOfWorkCreateSerializers(serializers.ModelSerializer):
    """"""
    station = serializers.PrimaryKeyRelatedField(
        queryset=Station.objects.all())
    type_work = serializers.PrimaryKeyRelatedField(
        many=True, queryset=TechCard.objects.all())
    okolotok = serializers.PrimaryKeyRelatedField(
        queryset=Okolotok.objects.all())
    userprofile = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserProfile.objects.all())
    
    class Meta:
        model = ReportOfWork
        fields = (
            'date_start',
            'date_end',
            'station',
            'type_work',
            'okolotok',
            'userprofile',
            'note',
            'subdivision')
        read_only_fields = (
            'station',
            'type_work',
            'okolotok',
            'userprofile',)
        extra_kwargs = {
            'date_start': {'required': True},
            'date_end': {'required': True},
            'station': {'required': True},
            'type_work': {'required': True},
            'okolotok': {'required': True},
            'userprofile': {'required': True},
            }


class RequstReportOfWorkSerializer(serializers.Serializer):
    """"""
    # def filter_bool_field(queryset, field, value):


    def filter_du(value):
        """Создает ленивый запрос, с замыканием для параметра ДУ46"""
        def wrapper(queryset):
            return queryset.filter(type_work__du46=value)

        return wrapper


    def filter_order(value):
        """Создает ленивый запрос, с замыканием для параметра записи в Журнал Распоряжений"""
        def wrapper(queryset):
            return queryset.filter(type_work__order=value)

        return wrapper
    
    def not_filter(queryset):
        return queryset

    TYPE_WORK_DU46_CHOICES = {
        'all': not_filter,
        'true': filter_du(True),
        'false': filter_du(False),
    }

    TYPE_WORK_ORDER_CHOICES = {
        'all': not_filter,
        'true': filter_order(True),
        'false': filter_order(False),
    }

    date_start = serializers.DateField(required=False)
    date_end = serializers.DateField(required=False)
    okolotok = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Okolotok.objects.all())
    station = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Station.objects.all())
    userprofiles = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True,
        queryset=UserProfile.objects.all())
    du46 = serializers.ChoiceField(
        default='all',
        choices=TYPE_WORK_DU46_CHOICES)
    order = serializers.ChoiceField(
        default='all',
        choices=TYPE_WORK_ORDER_CHOICES)
    type_works = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True,
        queryset=TechCard.objects.all())

    def get_queryset(self):
        queryset = ReportOfWork.objects.all()

        date_start = self.validated_data.get('date_start', None)
        if date_start:
            date_start = date_start.replace(hour=0, minute=0, second=0, microsecond=0)
            queryset.filter(date_start__gte=date_start)

        date_end = self.validated_data.get('date_end', None)
        if date_end:
            date_end = date_end.replace(hour=23, minute=59, second=59, microsecond=0)
            queryset.filter(date_start__lte=date_end)

        station = self.validated_data.get('station', None)
        if station:
            queryset.filter(station=station)

        okolotok = self.validated_data.get('okolotok', None)
        if station:
            queryset.filter(okolotok=okolotok)

        queryset = self.TYPE_WORK_DU46_CHOICES[self.validated_data['du46']](queryset)
        queryset = self.TYPE_WORK_ORDER_CHOICES[self.validated_data['order']](queryset)

        userprofiles = self.validated_data.get('userprofiles', None)
        if userprofiles:
            queryset.filter(userprofile__in=userprofiles)

        type_works = self.validated_data.get('type_works', None)
        if userprofiles:
            queryset.filter(type_work__in=type_works)

        return queryset


class ReportOfWorkSerializers_for_fast_query(serializers.ModelSerializer):
    """"""
    station__name = serializers.CharField(max_length=50, allow_blank=False)
    station__short_name = serializers.CharField(max_length=20, allow_blank=False)
    type_work__code = serializers.CharField(max_length=20, allow_blank=False)
    type_work__name = serializers.CharField(max_length=200, allow_blank=False)
    type_work__du46 = serializers.BooleanField(default=False)
    type_work__order = serializers.BooleanField(default=False)

    class Meta:
        model = ReportOfWork
        fields = (
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
        read_only_fields = (
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







# # Пока не использую
# class ReportOfWorkSerializers(serializers.ModelSerializer):
#     """
#     Serializer for ReportOfWork model

#     Не используется т.к. медленный
#     Пока не используется. Думаю понадобится для вывода данных в таблицу
#     """
#     type_work = TechCardSerializers(many=True)
#     station = StationSerializers()
    
#     class Meta:
#         model = ReportOfWork
#         fields = ['id', 'date_start', 'date_end', 'note', 'subdivision', 'station', 'type_work']





# class AdvandcedReportOfWorkSerializersIn(ReportOfWorkSerializersIn):
#     """
#     Serializer for ReportOfWork model

#     Набор данных для выполненого техпроцеса для выбранного пользователя
#     """
#     profile_user_id=serializers.IntegerField()

#     class Meta(ReportOfWorkSerializersIn.Meta):
#         fields = ReportOfWorkSerializersIn.Meta.fields + ('profile_user_id',)



# # Этот сериализатор подходит если мы запрашиваем данные при сменен ильтра.
# # Но я решил попробовать реализовать отдачу всей инфы на фронт, что бы манипуляция данными осуществлялась от туда.
# class ReportOfWorkSerializers_for_fast_query_OLD(serializers.ModelSerializer):
#     """
#     Serializer for ReportOfWork model

#     Пока не используется. Думаю понадобится для вывода данных в таблицу
#     """
#     station__short_name = serializers.CharField(max_length=20, allow_blank=False)
#     type_work__code = serializers.CharField(max_length=20, allow_blank=False)
    
#     class Meta:
#         model = ReportOfWork
#         fields = ['id', 'date_start', 'date_end', 'note', 'subdivision', 'station__short_name', 'type_work__code']




# # TYPE_WORK_CHOICES = (
# #     ('0', 'all'),
# #     ('1', 'du'),
# #     ('2', 'notdu'),
# # )




















# class UserSerializer(serializers.ModelSerializer):
#     """"""

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email']


# class UserProfileSerializer(serializers.ModelSerializer):
#     """"""
#     user = UserSerializer()
#     okolotok = OkolotokSerializers()
    
#     class Meta:
#         model = UserProfile
#         fields = ['id', 'user', 'active', 'okolotok']

