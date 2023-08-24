import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          this.authService.isAuthenticated()
        ) {
          switch (err.status) {
            case HttpStatusCode.Unauthorized:
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please log in again',
              });
              this.authService.logout();
              this.router.navigate(['/login']);
              break;
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
