from rest_framework import serializers
from .models import Courses, Leccion


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['id', 'name', 'approval_grade']


class LeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leccion
        fields = ['id', 'curso', 'titulo', 'contenido', 'orden']
