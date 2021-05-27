import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProducts() {
    return this.http.get(`${environment.baseApi}/products`);
  }

  purchaseProduct(id: string, body: Object) {
    return this.http.put(`${environment.baseApi}/users/${id}`, body);
  }

}
