import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from './primeng.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthInterceptor } from './auth.interceptor';
import { LogoutViewComponent } from './components/logout-view/logout-view.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { StoreModule } from '@ngrx/store';

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
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
