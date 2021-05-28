import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  listUsers = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getUsers();
  }

  createForm() {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: [null, [Validators.required, Validators.minLength(5)]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      senhaConfirmacao: [null, [Validators.required, Validators.minLength(3)]],
      acceptTerms: [false]
    })
  }

  getUsers() {
    this.authService.getUsers().subscribe((e: []) => this.listUsers = e);
  }

  onSubmit() {
    if (this.form.get('email').invalid) {
      alert('Insira um e-mail válido');
      return;
    }

    if (this.form.invalid) {
      alert('Todos os campos são Obrigatórios');
      return;
    }

    if (this.form.get('acceptTerms').value !== true) {
      alert('Para prosseguir é necessário aceitar o termo');
      return;
    }

    if (this.form.get('senha').value !== this.form.get('senhaConfirmacao').value) {
      alert('As senhas não conferem, corriga e tente novamente');
      return;
    }

    if (this.listUsers.some(res => (res.email).toLowerCase() == (this.form.get('email').value).toLowerCase())) {
      alert('E-mail já cadastrado');
      return;
    }


    let body = {
      name: this.form.get('nome').value,
      email: this.form.get('email').value,
      password: this.form.get('senha').value,
      endereco: this.form.get('endereco').value,
      pontos: 200
    }

    this.authService.postUser(body).subscribe(
      res => {
        alert('Usuário cadastrado com sucesso');
        this.router.navigate(['/auth/login']);
      }
    )

  }
}
