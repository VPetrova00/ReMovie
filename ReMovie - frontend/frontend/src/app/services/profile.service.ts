import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private getSearchHistoryUrl: string = 'http://localhost:8000/search_history';
  private getFavMoviesUrl: string = 'http://localhost:8000/favourite_movies'
  private getRatedMoviesUrl: string = 'http://localhost:8000/rated_movies'

  constructor(private http: HttpClient) {}

  getSearchHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface[]>(this.getSearchHistoryUrl, { headers: headers });
  }

  getFavMovies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface[]>(this.getFavMoviesUrl, { headers: headers });
  }

  getRatedMovies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface[]>(this.getRatedMoviesUrl, { headers: headers });
  }
}
