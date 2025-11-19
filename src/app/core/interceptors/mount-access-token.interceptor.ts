import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';

export const mountAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const accessToken = tokenService.accessToken;

  if (!accessToken) return next(req);

  let headers = new HttpHeaders();
  headers = headers.append('Authorization', `Bearer ${accessToken}`);

  const updateReq = req.clone({
    headers,
  });

  return next(updateReq);
};
