from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UsersViewSet)
router.register(r'movies', views.MoviesViewSet)
router.register(r'genres', views.GenreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('backend-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
