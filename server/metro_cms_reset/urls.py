"""metro_cms_reset URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.urls import include
# from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # Ваоиент 1
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
    # Ваоиент 2
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),

    # Ваоиент 3
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),

    # Мои приложения
    path('api/v1/cms/', include('cms.urls', namespace='api_cms')),
]


from django.conf import settings
from django.conf.urls.static import static


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += path('__debug__/', include(debug_toolbar.urls)),


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
