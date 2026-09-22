from django.db import models
from core.models import BaseModel

class CategoriaProducto(BaseModel):
    nombre = models.CharField(max_length=100)


class Producto(BaseModel):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(CategoriaProducto, on_delete=models.SET_NULL, null=True, related_name='productos')
