from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Perfil, Direccion


class PerfilSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Perfil
        fields = ['id', 'usuario', 'telefono', 'bio']


class DireccionSerializer(serializers.ModelSerializer):
    perfil = serializers.PrimaryKeyRelatedField(queryset=Perfil.objects.all())

    class Meta:
        model = Direccion
        fields = ['id', 'perfil', 'ciudad', 'calle']
