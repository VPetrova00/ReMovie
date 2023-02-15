import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieInterface} from "../interfaces/movie-interface";

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private getAllMoviesUrl: string = 'http://localhost:8000/movies/';

  constructor(private http: HttpClient) {}

  getMovieById(movieId: number): Observable<MovieInterface> {
    let getMovieByIdUrl = this.getAllMoviesUrl + movieId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface>(getMovieByIdUrl, { headers: headers });
  }
}
