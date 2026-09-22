from django.db import models
from core.models import BaseModel

class Tecnologia(BaseModel):
    nombre = models.CharField(max_length=100, unique=True)
    tipo = models.CharField(max_length=50, help_text="Ej: lenguaje, framework, base de datos")


class Proyecto(BaseModel):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    tecnologias = models.ManyToManyField(Tecnologia, related_name='proyectos')