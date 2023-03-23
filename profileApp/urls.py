from django.urls import path,include 


from .views import *


urlpatterns = [
    path('home/',home,name='home'),
    path('navToLogin/',navigateToLoginPage,name='navToLogin'),
    path('register/',register,name='register'),
    path('signup/',signup,name='signup'),
    path('login/',login,name='login'),
    path('logout/',logout,name='logout')
]

from django.conf.urls.static import static 
from django.conf import settings

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)