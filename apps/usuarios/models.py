from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel

class Perfil(BaseModel):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    telefono = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)


class Direccion(BaseModel):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name='direcciones')
    ciudad = models.CharField(max_length=100)
    calle = models.CharField(max_length=200)

    