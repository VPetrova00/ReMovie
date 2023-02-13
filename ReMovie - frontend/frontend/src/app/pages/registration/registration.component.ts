import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user-interface";
import {RegistrationService} from "../../services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  isErrorOccurred: boolean = false;

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    let user = new User(this.username, this.email, this.password);
    this.service.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isErrorOccurred = true;
      }
    });
  }
}
