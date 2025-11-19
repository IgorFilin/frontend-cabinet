import { DestroyRef, inject, Injectable, OnInit } from '@angular/core';
import * as VKID from '@vkid/sdk';
import { Config, OneTap } from '@vkid/sdk';
import { RequestService } from './request.service';
import { catchError, from, map } from 'rxjs';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class VkAuthService {
  destroyRef = inject(DestroyRef);

  constructor(private requestService: RequestService, private authService: AuthService, private toastService: ToasterService) {}

  initialVkConfig() {
    if (VKID) {
      VKID?.Config?.init({
        app: environment.auth_vk.app,
        redirectUrl: environment.auth_vk.redirectUrl,
        responseMode: VKID.ConfigResponseMode.Callback,
        scope: 'email name',
      });
    }
  }

  private getAuthVkRequest(payload: any) {
    return this.requestService.post<any, any>('user/vk_auth', payload).pipe(
      map((data: any) => {
        // this.authService.setAuthAndNavigateMainPage(data);
      }),
      catchError((error) => {
        const errorMessage = error.error.message;
        this.toastService.error(errorMessage);
        return error;
      })
    );
  }

  initialOneTapButton() {
    const oneTap = new OneTap();
    const container = document.getElementById('VkIdSdkOneTap');
    if (container) {
      oneTap
        .render({
          container: container,
          styles: {
            width: 250,
            borderRadius: 10,
          },
          scheme: VKID.Scheme.LIGHT,
          lang: VKID.Languages.RUS,
        })
        .on(VKID.WidgetEvents.ERROR, (error: any) => {
          console.warn(error);
        })
        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: any) => {
          from(VKID.Auth.exchangeCode(payload.code, payload.device_id))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(async (data: any) => {
              const { user } = await VKID.Auth.userInfo(data.access_token);
              this.getAuthVkRequest(user).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
            });
        });
    }
  }
}
