from django.urls import path

from . import views

urlpatterns = [
    path('estudiantes/', views.EstudianteListView.as_view()),
    path('estudiantes/<int:pk>/', views.EstudianteDetailView.as_view()),
    path('inscripciones/', views.InscripcionListView.as_view()),
    path('inscripciones/<int:pk>/', views.InscripcionDetailView.as_view()),
]
