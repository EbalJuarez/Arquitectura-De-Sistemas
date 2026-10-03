from rest_framework import serializers
from .models import Tecnologia, Proyecto


class TecnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tecnologia
        fields = ['id', 'nombre', 'tipo']


class ProyectoSerializer(serializers.ModelSerializer):
    tecnologias = serializers.PrimaryKeyRelatedField(many=True, queryset=Tecnologia.objects.all())

    class Meta:
        model = Proyecto
        fields = ['id', 'nombre', 'descripcion', 'tecnologias']
