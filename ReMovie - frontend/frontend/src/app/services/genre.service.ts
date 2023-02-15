import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenreInterface} from "../interfaces/genre-interface";

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private getAllGenresUrl: string = 'http://localhost:8000/genres/';

  constructor(private http: HttpClient) {}

  getGenreById(genreId: number): Observable<GenreInterface> {
    let getGenreByIdUrl = this.getAllGenresUrl + genreId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<GenreInterface>(getGenreByIdUrl, { headers: headers });
  }
}
