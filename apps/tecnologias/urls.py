from django.urls import path

from . import views

urlpatterns = [
    path('tecnologias/', views.TecnologiaListView.as_view()),
    path('tecnologias/<int:pk>/', views.TecnologiaDetailView.as_view()),
    path('proyectos/', views.ProyectoListView.as_view()),
    path('proyectos/<int:pk>/', views.ProyectoDetailView.as_view()),
]
