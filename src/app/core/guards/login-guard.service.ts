import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {


  constructor(private router: Router) { }

  canActivate() {
    let user = localStorage.getItem('currentUser');

    if (!user) {
      return true;
    } else {
      this.router.navigate(['/home'])
    }

  }
}
