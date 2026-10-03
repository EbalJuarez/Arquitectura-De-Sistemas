from rest_framework import serializers
from apps.courses.models import Courses
from .models import Estudiante, Inscripcion


class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ['id', 'nombre', 'apellido', 'email', 'fecha_nacimiento']


class InscripcionSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all())
    curso = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())

    class Meta:
        model = Inscripcion
        fields = ['id', 'estudiante', 'curso', 'fecha']
