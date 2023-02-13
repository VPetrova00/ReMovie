import {Component, DoCheck, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
  }

  ngDoCheck(): void {
    this.isLoggedIn = !!sessionStorage['username'];
    this.username = sessionStorage['username'];
  }
}
