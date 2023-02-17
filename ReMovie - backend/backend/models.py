from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, username, email, password, **extra_fields):
        if not email or not password:
            raise ValueError('Email and Password are Required')
        user = self.model(username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']


class Genre(models.Model):
    genre_name = models.CharField(max_length=50)


class Movie(models.Model):
    movie_id = models.AutoField(primary_key=True)
    movie_title = models.CharField(max_length=50)
    movie_summary = models.CharField(max_length=200)
    movie_rating = models.FloatField()
    movie_genres = models.ManyToManyField(Genre, related_name="movies")
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
