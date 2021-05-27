import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { LoginGuardService } from './core/guards/login-guard.service';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate: [LoginGuardService] },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuardService] },
  { path: 'order', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule), canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
