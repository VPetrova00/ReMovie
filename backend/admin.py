from django.contrib import admin
from .models import User, Movie, Genre, SearchHistory, FavouriteMovies, RatedMovies


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


class SearchHistoryAdmin(admin.ModelAdmin):
    model = SearchHistory
    ordering = ("user",)
    search_fields = ("user",)
    list_display = ("user",)
    fields = ("user",)


class FavouriteMoviesAdmin(admin.ModelAdmin):
    model = FavouriteMovies
    ordering = ("user",)
    search_fields = ("user",)
    list_display = ("user",)
    fields = ("user",)


class RatedMoviesAdmin(admin.ModelAdmin):
    model = RatedMovies
    ordering = ("user",)
    search_fields = ("user", "rating")
    list_display = ("user", "rating")
    fields = ("user", "rating")


admin.site.register(User, UserAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(SearchHistory, SearchHistoryAdmin)
admin.site.register(FavouriteMovies, FavouriteMoviesAdmin)
admin.site.register(RatedMovies, RatedMoviesAdmin)
