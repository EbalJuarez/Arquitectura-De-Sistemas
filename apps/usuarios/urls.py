from django.urls import path

from . import views

urlpatterns = [
    path('perfiles/', views.PerfilListView.as_view()),
    path('perfiles/<int:pk>/', views.PerfilDetailView.as_view()),
    path('direcciones/', views.DireccionListView.as_view()),
    path('direcciones/<int:pk>/', views.DireccionDetailView.as_view()),
]
