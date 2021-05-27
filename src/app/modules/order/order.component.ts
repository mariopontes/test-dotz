import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';
import { OrdertService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: Order[];

  constructor(private orderService: OrdertService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((e: Order[]) => this.orderList = e);
  }
}
