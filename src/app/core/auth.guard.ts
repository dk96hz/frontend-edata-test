import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth-service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  if (!authService.userIsLoggedIn()) {
    return inject(Router).navigateByUrl('/login');
  }
  const routeRoles = route.data["roles"];
  if (routeRoles && routeRoles.length > 0) {
    return routeRoles.some((role: string) => authService.userHasRole(role));
  }
  return true;
};
