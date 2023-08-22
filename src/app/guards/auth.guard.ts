import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();
  const routeAfterLogin = (next: string): {} => {
    if (next) {
      return {
        queryParams: { next },
      };
    }
    return {};
  };

  if (!isAuthenticated) {
    router.navigate(['/login'], routeAfterLogin(route.url.join('/')));
    return false;
  }
  return true;
};
