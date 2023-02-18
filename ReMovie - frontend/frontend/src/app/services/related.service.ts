import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";

@Injectable({
  providedIn: 'root',
})
export class RelatedService {
  private relatedUrl = 'http://localhost:8000/movies/get_related_movies/';

  constructor(private http: HttpClient) {}

  getRelated(id: number | undefined) {
    let finalRelatedMoviesUrl = this.relatedUrl + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<MovieInterface[]>(finalRelatedMoviesUrl, { headers: headers });
  }
}
