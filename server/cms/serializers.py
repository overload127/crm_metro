import calendar
from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.db.models import Prefetch
from django.db.models.aggregates import Count
from django.db.models import OuterRef, Subquery
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
    user__id = serializers.IntegerField()
    okolotok__id = serializers.IntegerField()
    okolotok__name = serializers.CharField(max_length=150, allow_blank=True)
    
    class Meta:
        model = UserProfile
        fields = ('id', 'user__id', 'user__first_name', 'okolotok__id', 'okolotok__name',)


class DeviceForWorkSerializers(serializers.ModelSerializer):
    """"""
    class Meta:
        model = DeviceForWork
        fields = ('id', 'short_name', 'name', 'model', 'description',)
        read_only_fields = ('id', 'short_name', 'name', 'model', 'description',)


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
            'pafu',
            'jtp',
            'devices_for_work',)
        read_only_fields = (
            'id',
            'code',
            'name',
            'description',
            'du46',
            'order',
            'pafu',
            'jtp',
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
    users = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all())
    
    def validate_tech_cards(self, tech_cards):
        if len(tech_cards) == 0:
            raise serializers.ValidationError("must be one or more")
        return tech_cards

    def validate_users(self, users):
        if len(users) == 0:
            raise serializers.ValidationError("must be one or more")
        return users
    
    class Meta:
        model = ReportOfWork
        fields = (
            'date_start',
            'date_end',
            'station',
            'tech_cards',
            'okolotok',
            'users',
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
    @staticmethod
    def pre_validate(in_query_params):
        out_query_params = in_query_params.copy()

        # проверка параметра users
        if 'users' in out_query_params:
            in_list = out_query_params.getlist('users')
            out_list = [item for item in in_list if item != '']
            out_query_params.setlist('users', out_list)

        # проверка параметра users
        if 'tech_cards' in out_query_params:
            in_list = out_query_params.getlist('tech_cards')
            out_list = [item for item in in_list if item != '']
            out_query_params.setlist('tech_cards', out_list)
        
        return out_query_params

    def filter_du(value):
        """Создает ленивый запрос, с замыканием для параметра записи в Журнал ДУ46"""
        def wrapper(queryset):
            return queryset.filter(du46=value)

        return wrapper

    def filter_order(value):
        """Создает ленивый запрос, с замыканием для параметра записи в Журнал Распоряжений"""
        def wrapper(queryset):
            return queryset.filter(order=value)

        return wrapper

    def filter_pafu(value):
        """Создает ленивый запрос, с замыканием для параметра записи в журнал ПАФУ"""
        def wrapper(queryset):
            return queryset.filter(pafu=value)

        return wrapper

    def filter_jtp(value):
        """Создает ленивый запрос, с замыканием для параметра записи в Журнал ЖТП"""
        def wrapper(queryset):
            return queryset.filter(jtp=value)

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

    TECH_CARD_PAFU_CHOICES = {
        'all': not_filter,
        'true': filter_pafu(True),
        'false': filter_pafu(False),
    }

    TECH_CARD_JTP_CHOICES = {
        'all': not_filter,
        'true': filter_jtp(True),
        'false': filter_jtp(False),
    }

    date_start = serializers.DateField(required=False)
    date_end = serializers.DateField(required=False)
    okolotok = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Okolotok.objects.all())
    station = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Station.objects.all())
    users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        required=False,
        default=None)
    du46 = serializers.ChoiceField(
        default='all',
        choices=TECH_CARD_DU46_CHOICES)
    order = serializers.ChoiceField(
        default='all',
        choices=TECH_CARD_ORDER_CHOICES)
    pafu = serializers.ChoiceField(
        default='all',
        choices=TECH_CARD_PAFU_CHOICES)
    jtp = serializers.ChoiceField(
        default='all',
        choices=TECH_CARD_JTP_CHOICES)
    tech_cards = serializers.PrimaryKeyRelatedField(
        required=False,
        many=True,
        queryset=TechCard.objects.all())

    def get_queryset_v1(self):
        queryset_tech_card = TechCard.objects.all()

        queryset_tech_card = self.TECH_CARD_DU46_CHOICES[self.validated_data['du46']](queryset_tech_card)
        queryset_tech_card = self.TECH_CARD_ORDER_CHOICES[self.validated_data['order']](queryset_tech_card)
        queryset_tech_card = self.TECH_CARD_PAFU_CHOICES[self.validated_data['pafu']](queryset_tech_card)
        queryset_tech_card = self.TECH_CARD_JTP_CHOICES[self.validated_data['jtp']](queryset_tech_card)

        tech_cards = self.validated_data.get('tech_cards', None)
        if tech_cards:
            queryset_tech_card = queryset_tech_card.filter(id__in=[_.id for _ in tech_cards])


        queryset = ReportOfWork.objects.prefetch_related(
            Prefetch('tech_cards', queryset=queryset_tech_card)).annotate(
                tech_cards_count=Subquery(
                    queryset_tech_card.filter(reports_of_work=OuterRef('pk'))
                        .values('reports_of_work')
                        .annotate(count=Count('pk'))
                        .values('count')
                )).filter(tech_cards_count__gte=1)

        # queryset = queryset.filter(tech_cards__in=queryset_tech_card)

        date_start = self.validated_data.get('date_start', None)
        if date_start is None:
            date_start = datetime.now().replace(day=1)
        else:
            date_start = datetime.combine(date_start, datetime.min.time())
        date_start = date_start.replace(hour=0, minute=0, second=0, microsecond=0)
        date_start = make_aware(date_start)
        queryset = queryset.filter(date_start__gte=date_start)

        date_end = self.validated_data.get('date_end', None)
        if date_end is None:
            date_end = datetime.now()
            date_end = datetime.now().replace(day=calendar.monthrange(date_end.year, date_end.month)[1])
        else:
            date_end = datetime.combine(date_end, datetime.max.time())
        date_end = date_end.replace(hour=23, minute=59, second=59, microsecond=0)
        date_end = make_aware(date_end)
        queryset = queryset.filter(date_start__lte=date_end)

        station = self.validated_data.get('station', None)
        if station:
            queryset = queryset.filter(station=station)

        okolotok = self.validated_data.get('okolotok', None)
        if okolotok:
            queryset = queryset.filter(okolotok=okolotok)

        users = self.validated_data.get('users', None)
        if users:
            queryset = queryset.filter(users__in=users).distinct()

        return queryset

    # def get_queryset_report_of_work(self):
    #     queryset = ReportOfWork.objects.all()

    #     date_start = self.validated_data.get('date_start', None)
    #     if date_start:
    #         date_start = date_start.replace(hour=0, minute=0, second=0, microsecond=0)
    #         queryset = queryset.filter(date_start__gte=date_start)

    #     date_end = self.validated_data.get('date_end', None)
    #     if date_end:
    #         date_end = date_end.replace(hour=23, minute=59, second=59, microsecond=0)
    #         queryset = queryset.filter(date_start__lte=date_end)
        
    #     station = self.validated_data.get('station', None)
    #     if station:
    #         queryset = queryset.filter(station=station)

    #     okolotok = self.validated_data.get('okolotok', None)
    #     if okolotok:
    #         queryset = queryset.filter(okolotok=okolotok)
        
    #     users = self.validated_data.get('users', None)
    #     if users:
    #         queryset = queryset.filter(users__in=users)

    #     tech_cards = self.validated_data.get('tech_cards', None)
    #     if tech_cards:
    #         queryset = queryset.filter(tech_cards__in=tech_cards)
        
    #     queryset = queryset.values_list('id', 'date_start', 'date_end', 'station__name', 'station__short_name', 'okolotok__name', 'users', 'tech_cards', 'note', 'subdivision')
    #     return queryset

    # def get_queryset_tech_catd(self):
    #     queryset = TechCard.objects.all().values_list('id', 'name', 'devices_for_work__name')

    #     queryset = self.TECH_CARD_DU46_CHOICES[self.validated_data['du46']](queryset)
    #     queryset = self.TECH_CARD_ORDER_CHOICES[self.validated_data['order']](queryset)
        
    #     queryset = queryset.values_list('id', 'name', 'devices_for_work__name')
    #     return queryset



class ReportOfWorkSerializer(serializers.ModelSerializer):
    """"""
    station = StationSerializers(read_only=True)
    okolotok = OkolotokSerializers(read_only=True)
    tech_cards = TechCardSerializers(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = ReportOfWork
        fields = (
            'id',
            'date_start',
            'date_end',
            'station',
            'okolotok',
            'users',
            'tech_cards',
            'note',
            'subdivision',)
        read_only_fields = (
            'id',
            'date_start',
            'date_end',
            'station',
            'okolotok',
            'users',
            'tech_cards',
            'note',
            'subdivision',)
