import { inject, Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthRepository } from '../infrastructure/repositories/auth.repository';
import { catchError, EMPTY, finalize, Observable, shareReplay, tap } from 'rxjs';
import { IRefreshTokenResponse } from '../shared/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _accessToken: string | null = null;

  refreshTokenRequest$: Observable<any> | null = null;

  private readonly authRepository = inject(AuthRepository);
  private readonly authService = inject(AuthService);

  get accessToken() {
    return this._accessToken;
  }

  set accessTokenUpdate(token: string) {
    this._accessToken = token;
  }

  getDecodeToken(): JwtPayload | null {
    if (this.accessToken) {
      const decodedToken = jwtDecode(this.accessToken);
      return decodedToken;
    }
    return null;
  }

  isValidToken() {
    const decodedToken = this.getDecodeToken();

    if (!decodedToken) return false;

    return decodedToken.exp! >= new Date().getTime() / 1000;
  }

  refresh() {
    if (this.refreshTokenRequest$) {
      return this.refreshTokenRequest$;
    }

    this.refreshTokenRequest$ = this.authRepository.refreshToken().pipe(
      tap((response) => {
        const { accessToken = '' } = response.data?.tokens || {};
        this.accessTokenUpdate = accessToken;
        this.authService.setAuthData(true);
      }),
      finalize(() => {
        this.refreshTokenRequest$ = null;
      }),
      catchError(() => {
        return EMPTY;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    return this.refreshTokenRequest$;
  }
}
