import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsers() {
    return this.http.get(`${environment.baseApi}/users`);
  }

  postUser(body: Object) {
    return this.http.post(`${environment.baseApi}/users`, body);
  }

  putUser(id: string, body: Object) {
    return this.http.put(`${environment.baseApi}/users/${id}`, body);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login'])
  }
}
