import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdertService {

  constructor(
    private http: HttpClient,
  ) { }

  createOrder(body: Object) {
    return this.http.post(`${environment.baseApi}/order`, body);
  }

  getOrders() {
    return this.http.get(`${environment.baseApi}/order`);
  }
}
