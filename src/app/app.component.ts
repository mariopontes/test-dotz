import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-dotz';
  isLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(e => {
      (location.pathname === '/auth/login' || location.pathname === '/auth/sign-up') ? this.isLogin = true : this.isLogin = false
    });

    if (localStorage.getItem('currentUser')) {
      this.authService.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
