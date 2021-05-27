import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listProducts = [];
  modalRef: BsModalRef;

  dataUser: User;
  productSelected: Product;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getUserData();
  }

  getUserData() {
    this.dataUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.dataUser);
  }

  getProducts() {
    this.http.get(`${environment.baseApi}/products`).subscribe((e: any) => this.listProducts = e);
  }

  selectProduct(product: any, template: TemplateRef<any>) {
    console.log(product);
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
    if (this.dataUser.pontos < this.productSelected.price) {
      alert('Você não tem saldo suficiente');
      return;
    }

    let body = {
      pontos: (this.dataUser.pontos - this.productSelected.price)
    }

    this.http.put(`${environment.baseApi}/users/${this.dataUser.id}`, body).subscribe(
      (e: User) => {
        localStorage.setItem('currentUser', JSON.stringify(e));
        this.dataUser = e;
        this.modalService.hide();
        alert('Resgate realizado com sucesso!!!');
      }
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login'])
  }
}
