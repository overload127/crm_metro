from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ReportOfWork, PreReportOfWork, TPTypeWork, Station, Okolotok, ProfileUser


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']



class TPTypeWorkSerializers(serializers.ModelSerializer):
    """
    Serializer for TPTypeWork model
    """
    
    class Meta:
        model = TPTypeWork
        fields = ['id', 'code', 'name', 'du46']


class StationSerializers(serializers.ModelSerializer):
    """
    Serializer for Station model
    """
    
    class Meta:
        model = Station
        fields = ['short_name', 'name', 'okolotok']


class OkolotokSerializers(serializers.ModelSerializer):
    """
    Serializer for Okolotok model
    """
    
    class Meta:
        model = Okolotok
        fields = ['id', 'name']


class ReportOfWorkSerializers(serializers.ModelSerializer):
    """
    Serializer for ReportOfWork model

    Не используется т.к. медленный
    """
    type_work = TPTypeWorkSerializers(many=True)
    station = StationSerializers()
    
    class Meta:
        model = ReportOfWork
        fields = ['id', 'data_start', 'data_end', 'note', 'subdivision', 'station', 'type_work']



class ReportOfWorkSerializers_for_fast_query(serializers.ModelSerializer):
    """
    Serializer for ReportOfWork model
    """
    station__short_name = serializers.CharField(max_length=20, allow_blank=False)
    type_work__code = serializers.CharField(max_length=20, allow_blank=False)
    
    class Meta:
        model = ReportOfWork
        fields = ['id', 'data_start', 'data_end', 'note', 'subdivision', 'station__short_name', 'type_work__code']


class PreReportOfWorkSerializers(serializers.ModelSerializer):
    """
    Serializer for PreReportOfWork model

    Не используется т.к. медленный
    """
    type_work = TPTypeWorkSerializers(many=True)
    station = StationSerializers()
    
    class Meta:
        model = PreReportOfWork
        fields = ['id', 'data_start', 'data_end', 'note', 'subdivision', 'station', 'type_work']


class PreReportOfWorkSerializers_for_fast_query(serializers.ModelSerializer):
    """
    Serializer for PreReportOfWork model
    """
    station__short_name = serializers.CharField(max_length=20, allow_blank=False)
    type_work__code = serializers.CharField(max_length=20, allow_blank=False)
    profile_user__user_site__first_name = serializers.CharField(max_length=20, allow_blank=False)
    profile_user__user_site__last_name = serializers.CharField(max_length=20, allow_blank=False)
    
    class Meta:
        model = PreReportOfWork
        fields = ['id', 'data_start', 'data_end', 'note', 'subdivision', 'station__short_name', 'type_work__code', 'profile_user__user_site__first_name', 'profile_user__user_site__last_name']


class ProfileUserSerializers(serializers.ModelSerializer):
    """
    Serializer for ProfileUser model
    """
    user_site = UserSerializers()
    okolotok = OkolotokSerializers()
    
    class Meta:
        model = ProfileUser
        fields = ['id', 'user_site', 'active', 'okolotok']