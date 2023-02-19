import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";
import {ProfileRatingInterface} from "../interfaces/profile-rating-interface";
import {ProfileInterface} from "../interfaces/profile-interface";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private getSearchHistoryUrl: string = 'http://localhost:8000/search_history';
  private getFavMoviesUrl: string = 'http://localhost:8000/favourite_movies';
  private getRatedMoviesUrl: string = 'http://localhost:8000/rated_movies';

  constructor(private http: HttpClient) {}

  getSearchHistory(userId: number) {
    let getHistoryByUserIdUrl = this.getSearchHistoryUrl + '/get_history_by_user_id/' + userId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });
    return this.http.get<ProfileInterface[]>(getHistoryByUserIdUrl, { headers: headers });
  }

  getFavMovies(userId: number) {
    let getFavsByUserIdUrl = this.getFavMoviesUrl + '/get_favs_by_user_id/' + userId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });
    return this.http.get<ProfileInterface[]>(getFavsByUserIdUrl, { headers: headers });
  }

  getRatedMovies(userId: number) {
    let getRatedByUserIdUrl = this.getRatedMoviesUrl + '/get_rated_by_user_id/' + userId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });
    return this.http.get<ProfileRatingInterface[]>(getRatedByUserIdUrl, { headers: headers });
  }

  rateMovie(userId: number, movieId: number | undefined, rating: number) {
    let url = this.getRatedMoviesUrl + '/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });
    return this.http.post<ProfileRatingInterface>(url, {
      "user": userId,
      "movies": [movieId],
      "rating": rating
    }, { headers: headers });
  }

  addToFavourites(userId: number, movieId: number) {
    let url = this.getFavMoviesUrl + '/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });
    return this.http.post<ProfileInterface>(url, {
      "user": userId,
      "movies": [movieId]
    }, { headers: headers });
  }
}
