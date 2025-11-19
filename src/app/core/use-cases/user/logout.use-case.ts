import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AuthRepository } from '../../../infrastructure/repositories/auth.repository';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository, private readonly authService: AuthService, private readonly router: Router, private readonly tokenService: TokenService) {}

  execute() {
    return this.authRepository.logout().pipe(
      tap((response) => {
        const { success } = response;
        if (success) {
          this.tokenService.accessTokenUpdate = '';
          this.authService.setAuthData();
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
