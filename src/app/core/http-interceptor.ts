import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth-service';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.userIsLoggedIn()) {
    req = req.clone({headers: req.headers.append('Authorization', authService.authHeader!),});
  }

  return next(req);
};
