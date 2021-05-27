import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    this.verificaDadosSalvos();
  }

  createForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      lembrarLogin: [false]
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe((e: []) => this.listUsers = e);
  }

  verificaDadosSalvos() {
    if (localStorage.getItem('lembrarLogin')) {
      let dadosSalvos = JSON.parse(localStorage.getItem('lembrarLogin'));

      this.form.patchValue({
        email: dadosSalvos.email,
        senha: dadosSalvos.senha,
        lembrarLogin: true
      })
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Os campos email e senha são obrigatorios');
      return
    }

    let user: any = this.listUsers.find(res => (res.email).toLowerCase() === (this.form.get('email').value).toLowerCase());

    if (!user) {
      alert('E-mail não cadastrado em nosso banco de dados');
      return;

    } else if (user.password === this.form.get('senha').value) {

      this.authService.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));

      if (this.form.get('lembrarLogin').value) {
        let dadosSalvos = {
          email: this.form.get('email').value,
          senha: this.form.get('senha').value
        }
        localStorage.setItem('lembrarLogin', JSON.stringify(dadosSalvos));

      } else {
        localStorage.removeItem('lembrarLogin');
      }

      this.router.navigate(['/home']);

    } else {
      alert('E-mail e/ou senha incorretos');
      return;
    }

  }
}
