from django.urls import path

from . import views

urlpatterns = [
    path('courses/', views.CoursesListView.as_view()),
    path('courses/<int:pk>/', views.CoursesDetailView.as_view()),
    path('lecciones/', views.LeccionListView.as_view()),
    path('lecciones/<int:pk>/', views.LeccionDetailView.as_view()),
]
