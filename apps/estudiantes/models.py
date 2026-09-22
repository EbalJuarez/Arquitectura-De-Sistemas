from django.db import models
from core.models import BaseModel

class Estudiante(BaseModel):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)

    

class Inscripcion(BaseModel):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='inscripciones')
    curso = models.ForeignKey('courses.Courses', on_delete=models.CASCADE, related_name='inscripciones')
    fecha = models.DateField(auto_now_add=True)

    