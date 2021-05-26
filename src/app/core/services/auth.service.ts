import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${environment.baseApi}/users`);
  }

  postUser(body: {}) {
    return this.http.post(`${environment.baseApi}/users`, body);
  }
}
