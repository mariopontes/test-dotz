import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdertService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: Order[];

  constructor(
    private orderService: OrdertService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders(this.authService.currentUser.id).subscribe((e: Order[]) => this.orderList = e);
  }
}
