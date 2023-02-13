import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginInterface} from "../../interfaces/login-interface";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  tokens!: LoginInterface;
  isErrorOccurred: boolean = false;

  constructor(private service: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.service.getTokens(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)?.subscribe({
      next: tokens => {
        this.tokens = tokens;
        sessionStorage.setItem('access-token', this.tokens['access']);
        sessionStorage.setItem('refresh-token', this.tokens['refresh']);
        if (this.loginForm.controls['username'].value != null) {
          sessionStorage.setItem('username', this.loginForm.controls['username'].value)
        }
        this.router.navigate(['/home']);
      },
      error: err => {
        this.isErrorOccurred = true;
      }
    });
  }
}
