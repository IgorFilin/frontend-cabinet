import { ApplicationConfig, LOCALE_ID, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { UtilsService } from './services/utils.servise';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CLIPBOARD_OPTIONS, ClipboardButtonComponent, provideMarkdown } from 'ngx-markdown';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { apiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { retryRequestInterceptor } from './core/interceptors/retry-request.interceptor';
import { mountAccessTokenInterceptor } from './core/interceptors/mount-access-token.interceptor';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { TokenService } from './services/token.service';
import { ILoginDataSuccessAuth } from './shared/models';

registerLocaleData(localeRu);

function initializeAppFactory(tokenService: TokenService): () => Observable<ILoginDataSuccessAuth> {
  return () => tokenService.refresh();
}

export const appConfig: ApplicationConfig = {
  providers: [
    UtilsService,
    ToasterService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([refreshTokenInterceptor, errorHandlerInterceptor, apiPrefixInterceptor, retryRequestInterceptor, mountAccessTokenInterceptor])),
    provideToastr(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    }),
    provideAppInitializer(() => {
      const initializerFn = initializeAppFactory(inject(TokenService));
      return initializerFn();
    }),
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
};
