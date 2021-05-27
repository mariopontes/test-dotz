import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

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

  getOrders(id: string) {
    return this.http.get(`${environment.baseApi}/order`).pipe(
      map((res: any[]) => {
        return res.filter(e => e.userId === id);
      })
    );
  }
}
