from rest_framework import serializers
from .models import User, Movie, Genre, SearchHistory, FavouriteMovies, RatedMovies


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('genre_name',)


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ("movie_id", "movie_title", "movie_summary", "movie_rating", "movie_genres", "movie_release_date")


class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ("user", "movies")


class FavouriteMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteMovies
        fields = ("user", "movies")


class RatedMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatedMovies
        fields = ("user", "movies", "rating")
