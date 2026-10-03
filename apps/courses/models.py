from django.db import models
from core.models import BaseModel

class Courses(BaseModel):
    name = models.CharField(max_length=30)
    approval_grade = models.IntegerField()

    def __str__(self):
        return self.name

class Leccion(BaseModel):
    curso = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name='lecciones')
    titulo = models.CharField(max_length=150)
    contenido = models.TextField(blank=True)
    orden = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['orden']

    