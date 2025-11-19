import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { switchMap, tap } from 'rxjs';
import { TokenService } from '../../services/token.service';

const IS_IGNORE_REQUESTS = ['refresh', 'login', 'registration'];

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const isInvalidReqExist = IS_IGNORE_REQUESTS.some((ignoredReq) => req.url.includes(ignoredReq));

  if (isInvalidReqExist) {
    return next(req);
  }

  const isValid = tokenService.isValidToken();

  if (!isValid) {
    return tokenService.refresh().pipe(
      switchMap(() => {
        return next(req);
      })
    );
  }
  return next(req);
};
