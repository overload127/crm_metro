from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
# router.register(r'advanced_user', views.UserProfileViewSet, basename='advanced_user')

app_name = 'api_cms'
urlpatterns = router.urls

urlpatterns += [
    path('userprofile/me', views.UserProfileMe.as_view(), name='userprofile_info'),
    path('userprofile/all', views.UserProfileAll.as_view(), name='userprofile_info'),
    path('wiki/okolotok', views.WikiOkolotok.as_view(), name='wiki_okolotok'),
    path('wiki/device_for_work', views.WikiDeviceForWork.as_view(), name='wiki_device_for_work'),
    path('wiki/tech_card', views.WikiTechCard.as_view(), name='wiki_tech_card'),
    path('wiki/station', views.WikiStation.as_view(), name='wiki_station'),
    path('service/report_of_work', views.ServiceReportOfWork.as_view(), name='service_create_report_of_work'),
    path('service/report_of_work/<str:date_start>/<str:date_end>/<int:okolotok>/<int:station>/<int:userprofiles>/<str:du46>/<str:order>/<int:tech_cards>', views.ServiceReportOfWork.as_view(), name='service_request_report_of_work'),
]