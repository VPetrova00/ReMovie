import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieInterface} from "../interfaces/movie-interface";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private getTop15ByReleaseDate: string = 'http://localhost:8000/movies?limit=15';

  constructor(private http: HttpClient) {}

  getTop15() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    });

    return this.http.get<MovieInterface[]>(this.getTop15ByReleaseDate, { headers: headers });
  }
}
