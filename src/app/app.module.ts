import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from './primeng.module';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { MenubarComponent } from './components/partials/menubar/menubar.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { BreadcrumbComponent } from './components/partials/breadcrumb/breadcrumb.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { LogoutViewComponent } from './components/auth/logout-view/logout-view.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DescriptionListComponent } from './components/partials/description-list/description-list.component';
import { MerchantListComponent } from './components/merchant/merchant-list/merchant-list.component';
import { MerchantViewComponent } from './components/merchant/merchant-view/merchant-view.component';
import { MerchantFormComponent } from './components/merchant/merchant-form/merchant-form.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryFormComponent } from './components/product/product-category-form/product-category-form.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { RolePipe } from './pipes/role.pipe';
import { ProductCategoryListComponent } from './components/product/product-category-list/product-category-list.component';
import { InvoiceFormComponent } from './components/invoice/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './components/invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './components/invoice/invoice-view/invoice-view.component';
import { FormInputComponent } from './components/partials/form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    MenubarComponent,
    ProductViewComponent,
    BreadcrumbComponent,
    LoginFormComponent,
    LogoutViewComponent,
    RegisterUserComponent,
    DashboardComponent,
    DescriptionListComponent,
    MerchantListComponent,
    MerchantViewComponent,
    MerchantFormComponent,
    PageNotFoundComponent,
    ProductCategoryFormComponent,
    RolePipe,
    ProductCategoryListComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
    InvoiceViewComponent,
    FormInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimengModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['https://example.com'], // TODO
      },
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: '',
    }),
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
