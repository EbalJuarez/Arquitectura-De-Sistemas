from django.urls import path

from . import views

urlpatterns = [
    path('categorias-producto/', views.CategoriaProductoListView.as_view()),
    path('categorias-producto/<int:pk>/', views.CategoriaProductoDetailView.as_view()),
    path('productos/', views.ProductoListView.as_view()),
    path('productos/<int:pk>/', views.ProductoDetailView.as_view()),
]
