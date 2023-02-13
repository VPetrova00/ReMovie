import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../interfaces/login-interface";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private getTokensUrl: string = 'http://localhost:8000/login/';

  constructor(private http: HttpClient) {}

  getTokens(username: string | null, password: string | null) {
    if (username == null || password == null) {
      return;
    }

    return this.http.post<LoginInterface>(this.getTokensUrl, {
      "username": username,
      "password": password
    });
  }
}
