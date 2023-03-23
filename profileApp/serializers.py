from rest_framework import serializers 
from .models import RegisteredUsersModel 



class RegisteredUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUsersModel 
        fields = '__all__'
