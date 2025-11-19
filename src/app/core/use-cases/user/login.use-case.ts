import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ILoginUserPayload, ILoginUserPayloadByDevice } from '../../../shared/models';
import { AuthService } from '../../../services/auth.service';
import { DeviceService } from '../../../services/device.service';
import { AuthRepository } from '../../../infrastructure/repositories/auth.repository';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(
    private readonly router: Router,
    private readonly authRepository: AuthRepository,
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly tokenService: TokenService
  ) {}

  execute(userPayload: ILoginUserPayload) {
    const deviceId = this.deviceService.getUUIDDevice() || '';

    const userPayloadByDevice: ILoginUserPayloadByDevice = {
      ...userPayload,
      deviceId,
    };

    return this.authRepository.login(userPayloadByDevice).pipe(
      tap((response) => {
        const { data, success } = response;
        if (data) {
          this.tokenService.accessTokenUpdate = data.accessToken;
          this.authService.setAuthData(true);
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
