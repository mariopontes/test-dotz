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
  fixHeight = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(res => {
      (location.pathname === '/auth/login' || location.pathname === '/auth/sign-up') ? this.isLogin = true : this.isLogin = false;
      location.pathname === '/order' ? this.fixHeight = 'fix-height' : this.fixHeight = ' ';
    });

    if (localStorage.getItem('currentUser')) {
      this.authService.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
