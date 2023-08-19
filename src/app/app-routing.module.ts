import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutViewComponent } from './components/logout-view/logout-view.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterUserComponent,
    title: 'Register',
    canActivate: [!authGuard],
    data: {
      breadcrumb: 'Register',
    },
  },
  {
    path: 'login',
    component: LoginFormComponent,
    title: 'Login',
    data: {
      breadcrumb: 'Login',
    },
  },
  {
    path: 'logout',
    component: LogoutViewComponent,
    title: 'Logout',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Logout',
    },
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: 'Products',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Products',
    },
  },
  {
    path: 'product/new',
    component: ProductFormComponent,
    title: 'New Product',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'New',
    },
  },
  {
    path: 'product/:productId/edit',
    component: ProductFormComponent,
    title: 'New Product',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'New',
    },
  },
  {
    path: 'product/:productId',
    component: ProductViewComponent,
    title: 'Product',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'View',
    },
  },
  // { path: '**', redirectTo: '', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
