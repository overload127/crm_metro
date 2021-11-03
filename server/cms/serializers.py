import calendar
from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.utils.timezone import make_aware
from rest_framework import serializers

from .models import ReportOfWork, TechCard, Station, Okolotok, UserProfile, DeviceForWork


class UserSerializer(serializers.ModelSerializer):
    """"""

    class Meta:
        model = User
        fields = ['id', 'first_name']


class OkolotokSerializers(serializers.ModelSerializer):
    """"""
    
    class Meta:
        model = Okolotok
        fields = ('id', 'name',)
        read_only_fields = ('id', 'name',)


class UserProfileSerializer(serializers.ModelSerializer):
    """"""
    user__first_name = serializers.CharField(max_length=150, allow_blank=True)
    okolotok__id = serializers.IntegerField()
    okolotok__name = serializers.CharField(max_length=150, allow_blank=True)
    
    class Meta:
        model = UserProfile
        fields = ('id', 'user__first_name', 'okolotok__id', 'okolotok__name',)


class DeviceForWorkSerializers(serializers.ModelSerializer):
    """"""
    class Meta:
        model = DeviceForWork
        fields = ('id', 'name', 'description',)
        read_only_fields = ('id', 'name', 'description',)


class TechCardSerializers(serializers.ModelSerializer):
    """"""
    devices_for_work = DeviceForWorkSerializers(many=True, read_only=True)

    class Meta:
        model = TechCard
        fields = (
            'id',
            'code',
            'name',
            'description',
            'du46',
            'order',
            'devices_for_work',)
        read_only_fields = (
            'id',
            'code',
            'name',
            'description',
            'du46',
            'order',
            'devices_for_work',)


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
    tech_cards = serializers.PrimaryKeyRelatedField(
        many=True, queryset=TechCard.objects.all())
    okolotok = serializers.PrimaryKeyRelatedField(
        queryset=Okolotok.objects.all())
    userprofiles = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserProfile.objects.all())
    
    def validate_tech_cards(self, tech_cards):
        if len(tech_cards) == 0:
            raise serializers.ValidationError("must be one or more")
        return tech_cards

    def validate_userprofiles(self, userprofiles):
        if len(userprofiles) == 0:
            raise serializers.ValidationError("must be one or more")
        return userprofiles
    
    class Meta:
        model = ReportOfWork
        fields = (
            'date_start',
            'date_end',
            'station',
            'tech_cards',
            'okolotok',
            'userprofiles',
            'note',
            'subdivision')
        extra_kwargs = {
            'date_start': {'required': True},
            'date_end': {'required': True},
            'station': {'required': True},
            'okolotok': {'required': True},
            }


class RequstReportOfWorkSerializer(serializers.Serializer):
    """"""

    def filter_du(value):
        """Создает ленивый запрос, с замыканием для параметра ДУ46"""
        def wrapper(queryset):
            return queryset.filter(tech_cards__du46=value)

        return wrapper


    def filter_order(value):
        """Создает ленивый запрос, с замыканием для параметра записи в Журнал Распоряжений"""
        def wrapper(queryset):
            return queryset.filter(tech_cards__order=value)

        return wrapper
    
    def not_filter(queryset):
        return queryset

    TECH_CARD_DU46_CHOICES = {
        'all': not_filter,
        'true': filter_du(True),
        'false': filter_du(False),
    }

    TECH_CARD_ORDER_CHOICES = {
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
        choices=TECH_CARD_DU46_CHOICES)
    order = serializers.ChoiceField(
        default='all',
        choices=TECH_CARD_ORDER_CHOICES)
    tech_cards = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True,
        queryset=TechCard.objects.all())

    def get_queryset_v1(self):
        queryset = ReportOfWork.objects.all()

        date_start = self.validated_data.get('date_start', None)
        if date_start is None:
            date_start = datetime.now().replace(day=1)
        date_start = date_start.replace(hour=0, minute=0, second=0, microsecond=0)
        date_start = make_aware(date_start)
        queryset.filter(date_start__gte=date_start)

        date_end = self.validated_data.get('date_end', None)
        if date_end is None:
            date_end = datetime.now()
            date_end = datetime.now().replace(day=calendar.monthrange(date_end.year, date_end.month)[1])
        date_end = date_end.replace(hour=23, minute=59, second=59, microsecond=0)
        date_end = make_aware(date_end)
        queryset.filter(date_start__lte=date_end)

        station = self.validated_data.get('station', None)
        if station:
            queryset.filter(station=station)

        okolotok = self.validated_data.get('okolotok', None)
        if station:
            queryset.filter(okolotok=okolotok)

        queryset = self.TECH_CARD_DU46_CHOICES[self.validated_data['du46']](queryset)
        queryset = self.TECH_CARD_ORDER_CHOICES[self.validated_data['order']](queryset)

        userprofiles = self.validated_data.get('userprofiles', None)
        if userprofiles:
            queryset.filter(userprofile__in=userprofiles)

        tech_cards = self.validated_data.get('tech_cards', None)
        if userprofiles:
            queryset.filter(tech_cards__in=tech_cards)

        return queryset

    def get_queryset_report_of_work(self):
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
        
        userprofiles = self.validated_data.get('userprofiles', None)
        if userprofiles:
            queryset.filter(userprofile__in=userprofiles)

        tech_cards = self.validated_data.get('tech_cards', None)
        if userprofiles:
            queryset.filter(tech_cards__in=tech_cards)
        
        queryset = queryset.values_list('id', 'date_start', 'date_end', 'station__name', 'station__short_name', 'okolotok__name', 'userprofiles', 'tech_cards', 'note', 'subdivision')
        return queryset

    def get_queryset_tech_catd(self):
        queryset = TechCard.objects.all().values_list('id', 'name', 'devices_for_work__name')

        queryset = self.TECH_CARD_DU46_CHOICES[self.validated_data['du46']](queryset)
        queryset = self.TECH_CARD_ORDER_CHOICES[self.validated_data['order']](queryset)
        
        queryset = queryset.values_list('id', 'name', 'devices_for_work__name')
        return queryset



class ReportOfWorkSerializer(serializers.ModelSerializer):
    """"""
    station = StationSerializers(read_only=True)
    okolotok = OkolotokSerializers(read_only=True)
    tech_cards = TechCardSerializers(many=True, read_only=True)
    userprofiles = UserProfileSerializer(read_only=True)

    class Meta:
        model = ReportOfWork
        fields = (
            'id',
            'date_start',
            'date_end',
            'station',
            'okolotok',
            'userprofiles',
            'tech_cards',
            'note',
            'subdivision',)
        read_only_fields = (
            'id',
            'date_start',
            'date_end',
            'station',
            'okolotok',
            'userprofiles',
            'tech_cards',
            'note',
            'subdivision',)
