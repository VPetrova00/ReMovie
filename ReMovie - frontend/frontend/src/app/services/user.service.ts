import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs";
import {UserInterface} from "../interfaces/user-interface";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getUserByUsernameUrl = 'http://localhost:8000/users/get_user_by_username/';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string) {
    let getUserByUsernameUrl = this.getUserByUsernameUrl + username;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
    })
    return this.http.get<UserInterface>(getUserByUsernameUrl, { headers: headers });
  }
}
