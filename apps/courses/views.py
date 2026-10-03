from rest_framework import generics

from .models import Courses, Leccion
from .serializer import CoursesSerializer, LeccionSerializer


class CoursesListView(generics.ListCreateAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer


class CoursesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer


class LeccionListView(generics.ListCreateAPIView):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer


class LeccionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer
