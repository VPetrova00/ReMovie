from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer, MovieSerializer, GenreSerializer
from .models import User, Movie, Genre


class UsersViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('email')

    @action(detail=False, methods=['get'], url_path='get_user_by_username/(?P<username>\w+)')
    def get_user_by_username(self, request, username):
        user = get_object_or_404(User, username=username)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class GenreViewSet(ModelViewSet):
    serializer_class = GenreSerializer
    queryset = Genre.objects.all().order_by('genre_name')


class MoviesViewSet(ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all().order_by('movie_rating')

    @action(detail=False, methods=['get'], url_path='get_movie_by_title/(?P<movie_title>[ \w]+)')
    def get_movie_by_title(self, request, movie_title):
        movie = get_object_or_404(Movie, movie_title=movie_title)
        return Response(MovieSerializer(movie).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='get_movies_by_release_date/(?P<release_date>[\d-]+)')
    def get_movie_by_release_date(self, request, release_date):
        movies = get_list_or_404(Movie, movie_release_date=release_date)
        movies_responses = []
        for movie in movies:
            movies_responses.append(MovieSerializer(movie).data)
        return Response(movies_responses, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='get_movies_by_rating/(?P<rating>\d+)')
    def get_movies_by_rating(self, request, rating):
        movies = get_list_or_404(Movie, movie_rating=rating)
        movies_responses = []
        for movie in movies:
            movies_responses.append(MovieSerializer(movie).data)
        return Response(movies_responses, status=status.HTTP_200_OK)
