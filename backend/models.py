from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=50)


class Genre(models.Model):
    genre_name = models.CharField(max_length=50)


class Movie(models.Model):
    movie_id = models.AutoField(primary_key=True)
    movie_title = models.CharField(max_length=50)
    movie_summary = models.CharField(max_length=200)
    movie_rating = models.IntegerField()
    movie_genres = models.ManyToManyField(Genre)
    movie_release_date = models.DateField()


class SearchHistory(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='user_search_history')
    movies = models.ManyToManyField(Movie)


class FavouriteMovies(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='user_favs')
    movies = models.ManyToManyField(Movie)


class RatedMovies(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='user_ratings')
    movies = models.ManyToManyField(Movie)
    rating = models.IntegerField()
