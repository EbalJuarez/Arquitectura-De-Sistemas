from django.urls import path
from . import views

urlpatterns = [
    path('platos/', views.PlatoListView.as_view()),
    path('platos/<int:pk>/', views.PlatoDetailView.as_view()),
    path('categorias/', views.CategoriaListView.as_view()),
    path('categorias/<int:pk>/', views.CategoriaDetailView.as_view())
]