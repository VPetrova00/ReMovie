from django.contrib import admin
from .models import User, Movie, Genre


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    model = User
    ordering = ("username", "email")
    search_fields = ("username", "email")
    list_display = ("username", "email", "password")
    fields = ("username", "email", "password")


class GenreAdmin(admin.ModelAdmin):
    model = Genre
    ordering = ("genre_name",)
    search_fields = ("genre_name",)
    list_display = ("genre_name",)
    fields = ("genre_name",)


class MovieAdmin(admin.ModelAdmin):
    model = Movie
    ordering = ("movie_title",)
    search_fields = ("movie_title", "movie_release_date", "movie_rating")
    list_display = ("movie_title", "movie_summary", "movie_rating", "movie_release_date")
    fields = ("movie_title", "movie_summary", "movie_rating", "movie_release_date")


admin.site.register(User, UserAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Genre, GenreAdmin)
