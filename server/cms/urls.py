from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
# router.register(r'advanced_user', views.ProfileUserViewSet, basename='advanced_user')

app_name = 'api_cms'
urlpatterns = router.urls

urlpatterns += [
    # path('current_user/', views.current_user),
    # path('users/', views.UserList.as_view()),
    path('public_test/', views.public_test.as_view()),
    path('private_test/', views.private_test.as_view()),
    path('wiki/tp/', views.WikiTP.as_view(), name='wiki_get_tp'),
    path('wiki/station/', views.WikiStation.as_view(), name='wiki_get_station'),
    path('tp_work/create/', views.UserTPWorkCreate.as_view(), name='tp_work_create'),
]
