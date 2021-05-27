import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.mode';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdertService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listProducts = [];
  modalRef: BsModalRef;
  productSelected: Product;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrdertService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((e: any) => this.listProducts = e);
  }

  selectProduct(product: any, template: TemplateRef<any>) {
    this.productSelected = product;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  confirmPurchase() {
    if (this.authService.currentUser.pontos < this.productSelected.price) {
      alert('Você não tem saldo suficiente');
      return;
    }

    let body = {
      pontos: (this.authService.currentUser.pontos - this.productSelected.price)
    }

    this.productService.purchaseProduct(this.authService.currentUser.id, body).subscribe(
      (e: User) => {
        localStorage.setItem('currentUser', JSON.stringify(e));
        this.authService.currentUser = e;
        this.modalService.hide();


        let order: Order = {
          userId: this.authService.currentUser.id,
          address: this.authService.currentUser.endereco,
          product: this.productSelected.title,
          priceProduct: this.productSelected.price,
          status: 'emitido',
        }

        this.orderService.createOrder(order).subscribe(
          e => alert('Resgate realizado com sucesso!!!'),
          error => alert('Não foi possivel realizar seu pedido, tente novamente mais tarde')
        )
      }
    )
  }

  logout() {
    this.authService.logout();
  }
}
