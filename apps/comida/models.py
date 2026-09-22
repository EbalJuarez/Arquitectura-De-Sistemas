from django.db import models
from core.models import BaseModel

class Categoria(BaseModel):
    nombre = models.CharField(max_length=100)


class Plato(BaseModel):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='platos')
    disponible = models.BooleanField(default=True)