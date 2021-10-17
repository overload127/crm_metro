from django.contrib.auth.models import User
from rest_framework import serializers
# from rest_framework_jwt.settings import api_settings
from .models import ReportOfWork, PreReportOfWork, TPTypeWork, Station, Okolotok, ProfileUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# class UserSerializerWithToken(serializers.ModelSerializer):

#     token = serializers.SerializerMethodField()
#     password = serializers.CharField(write_only=True)

#     def get_token(self, obj):
#         jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#         jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

#         payload = jwt_payload_handler(obj)
#         token = jwt_encode_handler(payload)
#         return token

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     class Meta:
#         model = User
#         fields = ('token', 'username', 'password')



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
        fields = ['id', 'name', 'short_name']


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


class ProfileUserSerializer(serializers.ModelSerializer):
    """
    Serializer for ProfileUser model
    """
    user_site = UserSerializer()
    okolotok = OkolotokSerializers()
    
    class Meta:
        model = ProfileUser
        fields = ['id', 'user_site', 'active', 'okolotok']