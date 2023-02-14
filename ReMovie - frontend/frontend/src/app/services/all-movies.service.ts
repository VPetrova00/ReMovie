import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";
import {Observable, Subscription, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AllMoviesService {
  private getAllMovies: string = 'http://localhost:8000/movies/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovieInterface[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface[]>(this.getAllMovies, { headers: headers });
  }
}
