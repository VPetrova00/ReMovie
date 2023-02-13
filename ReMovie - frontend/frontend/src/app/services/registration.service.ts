import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User, UserInterface} from "../interfaces/user-interface";

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private registerUrl: string = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<UserInterface>(this.registerUrl, {
      "username": user.username,
      "email": user.email,
      "password": user.password
    });
  }
}
