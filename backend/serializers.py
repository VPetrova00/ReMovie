from rest_framework import serializers
from .models import User, Movie, Genre


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'username', 'email', 'password')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('genre_name',)


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ("movie_id", "movie_title", "movie_summary", "movie_rating", "movie_genres", "movie_release_date")
