from rest_framework import generics

from .models import Tecnologia, Proyecto
from .serializer import TecnologiaSerializer, ProyectoSerializer


class TecnologiaListView(generics.ListCreateAPIView):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer


class TecnologiaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer


class ProyectoListView(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer


class ProyectoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
