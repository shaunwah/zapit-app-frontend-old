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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryFormComponent } from './components/product/product-category-form/product-category-form.component';
import {ProductCategoryListComponent} from "./components/product/product-category-list/product-category-list.component";
import {InvoiceListComponent} from "./components/invoice/invoice-list/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice/invoice-form/invoice-form.component";
import {InvoiceViewComponent} from "./components/invoice/invoice-view/invoice-view.component";

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
  {
    path: 'product-categories',
    component: ProductCategoryListComponent,
    title: 'Product Categories',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'New',
    },
  },
  {
    path: 'product-category/new',
    component: ProductCategoryFormComponent,
    title: 'New Product Category',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'New',
    },
  },
  {
    path: 'product-category/:productCategoryId/edit',
    component: ProductCategoryFormComponent,
    title: 'Edit Product Category',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Edit',
    },
  },
  {
    path: 'invoices',
    component: InvoiceListComponent,
    title: 'Invoices',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'List',
    },
  },
  {
    path: 'invoice/new',
    component: InvoiceFormComponent,
    title: 'New Invoice',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'New',
    },
  },
  {
    path: 'invoice/:invoiceId/edit',
    component: InvoiceFormComponent,
    title: 'Edit Invoice',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Edit',
    },
  },
  {
    path: 'invoice/:invoiceId',
    component: InvoiceViewComponent,
    title: 'Invoice',
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Invoice',
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Not Found',
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
