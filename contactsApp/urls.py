from django.urls import path,include 
from .views import * 

urlpatterns = [
    path('',home,name='home'),
    path('navToCreateContact/',navToCreateContactForm,name='navToCreateContact'),
    path('navToEditContact/',navToEditContactForm,name='navToEditContactForm'),
    path('list/',ListContactsView.as_view(),name='listContacts'),
    path('create/',CreateContactsView.as_view(),name='createContacts'),
    path('retrieve/<str:user_input>/',RetrieveContactsView.as_view(),name='retrieveContact'),
    path('update/<str:user_input>/',UpdateContactsView.as_view(),name='updateContact'),
    path('destroy/<int:pk>/',DestroyContactsView.as_view(),name='destroyContact'),
    
]

from django.conf.urls.static import static 
from django.conf import settings

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)