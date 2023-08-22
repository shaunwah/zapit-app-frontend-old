import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { LogoutViewComponent } from './components/auth/logout-view/logout-view.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MerchantListComponent } from './components/merchant/merchant-list/merchant-list.component';
import { MerchantFormComponent } from './components/merchant/merchant-form/merchant-form.component';
import { MerchantViewComponent } from './components/merchant/merchant-view/merchant-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    title: 'Register',
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
    path: 'merchants',
    component: MerchantListComponent,
    title: 'Merchants',
    canActivate: [authGuard],
  },
  {
    path: 'merchant/new',
    component: MerchantFormComponent,
    title: 'New Merchant',
    canActivate: [authGuard],
  },
  {
    path: 'merchant/:merchantId/edit',
    component: MerchantFormComponent,
    title: 'Edit Merchant',
    canActivate: [authGuard],
  },
  {
    path: 'merchant/:merchantId',
    component: MerchantViewComponent,
    title: 'Merchant',
    canActivate: [authGuard],
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
    title: 'Edit Product',
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
