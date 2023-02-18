from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
import numpy as np
from sentence_transformers import SentenceTransformer
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from .serializers import UserSerializer, MovieSerializer, GenreSerializer, SearchHistorySerializer, \
    FavouriteMoviesSerializer, RatedMoviesSerializer
from .models import User, Movie, Genre, SearchHistory, FavouriteMovies, RatedMovies


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
    queryset = Movie.objects.all().order_by('-movie_release_date',)
    permission_classes = [IsAuthenticated]

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

    def give_recommendations(self, m_id, df_all_movies, X):
        cos_sim_data = pd.DataFrame(cosine_similarity(X))
        index_recomm = cos_sim_data.loc[m_id].sort_values(ascending=False).index.tolist()[1:6]
        movies_recomm = df_all_movies['movie_id'].loc[index_recomm].values
        result = {'Movies_id': movies_recomm, 'Index': index_recomm}
        return result

    @action(detail=False, methods=['get'], url_path='get_related_movies/(?P<movie_id>\d+)')
    def get_related_movies(self, request, movie_id):
        movie_index = int(movie_id) - 1
        all_movies = get_list_or_404(Movie)
        arr_all_movies = []

        for movie in all_movies:
            current_movie_id = movie.movie_id
            current_movie_title = movie.movie_title
            current_movie_summary = movie.movie_summary
            current_movie_rating = movie.movie_rating
            current_movie_release_date = movie.movie_release_date
            arr_all_movies.append({"movie_id": current_movie_id, "movie_title": current_movie_title,
                                   "movie_summary": current_movie_summary, 'movie_rating': current_movie_rating,
                                   'movie_release_date': current_movie_release_date})

        df_all_movies = pd.DataFrame(arr_all_movies,
                                     columns=['movie_id', 'movie_title', 'movie_summary', 'movie_rating',
                                              'movie_release_date'])
        X = np.array(df_all_movies['movie_summary'])
        model = SentenceTransformer('distilbert-base-nli-mean-tokens')
        embeddings = model.encode(X, show_progress_bar=True)
        embed_data = embeddings
        X = np.array(embed_data)

        recommendations_res = self.give_recommendations(movie_index, df_all_movies, X)
        movies_to_return = []
        for r in recommendations_res['Movies_id']:
            movie = get_object_or_404(Movie, movie_id=r)
            movies_to_return.append(MovieSerializer(movie).data)
        return Response(movies_to_return, status=status.HTTP_200_OK)


class SearchHistoryViewSet(ModelViewSet):
    serializer_class = SearchHistorySerializer
    queryset = SearchHistory.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='get_history_by_user_id/(?P<user_id>\d+)')
    def get_history_by_user_id(self, request, user_id):
        history_entries = get_object_or_404(SearchHistory, user_id=user_id)
        return Response(SearchHistorySerializer(history_entries).data, status=status.HTTP_200_OK)


class FavouriteMoviesViewSet(ModelViewSet):
    serializer_class = FavouriteMoviesSerializer
    queryset = FavouriteMovies.objects.all().order_by('user')
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='get_favs_by_user_id/(?P<user_id>\d+)')
    def get_favs_by_user_id(self, request, user_id):
        fav_entries = get_object_or_404(FavouriteMovies, user_id=user_id)
        return Response(FavouriteMoviesSerializer(fav_entries).data, status=status.HTTP_200_OK)


class RatedMoviesViewSet(ModelViewSet):
    serializer_class = RatedMoviesSerializer
    queryset = RatedMovies.objects.all().order_by('user')
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='get_rated_by_user_id/(?P<user_id>\d+)')
    def get_rated_by_user_id(self, request, user_id):
        rated_entries = get_list_or_404(RatedMovies, user_id=user_id)
        arr = []
        for entry in rated_entries:
            arr.append(RatedMoviesSerializer(entry).data)
        return Response(arr, status=status.HTTP_200_OK)
