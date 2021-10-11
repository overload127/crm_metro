# from django.urls import path
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'advanced_user', views.ProfileUserViewSet, basename='advanced_user')

app_name = 'api_cms'
urlpatterns = router.urls

# urlpatterns = [
#     path(
#         'user/',
#         views.UserViewSet,
#         name='user'
#     ),
# ]
