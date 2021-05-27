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
  address = new FormControl('');
  modalState = 1;

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
    this.address.setValue(this.authService.currentUser.endereco);

    this.modalRef = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: true
    });
  }

  closeModal() {
    this.modalService.hide();
    setTimeout(() => this.modalState = 1, 200);
  }

  confirmPurchase() {
    if (this.modalState === 1) {
      this.modalState = 2;
      return;
    }

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
        this.modalState = 1;
        this.authService.currentUser = e;
        this.modalService.hide();

        let order: Order = {
          userId: this.authService.currentUser.id,
          address: this.address.value,
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
