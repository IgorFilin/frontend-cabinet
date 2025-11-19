import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse, ILoginResponse, ILoginUserPayloadByDevice, IRefreshTokenResponse, IRegUserPayload } from '../../shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly httpClient = inject(HttpClient);

  refreshToken(): Observable<IApiResponse<IRefreshTokenResponse>> {
    return this.httpClient.get<IApiResponse<IRefreshTokenResponse>>('gateway/refresh', {
      withCredentials: true,
    });
  }

  login(loginUserPayload: ILoginUserPayloadByDevice): Observable<IApiResponse<ILoginResponse>> {
    return this.httpClient.post<IApiResponse<ILoginResponse>>('gateway/login', loginUserPayload, {
      withCredentials: true,
    });
  }

  logout(): Observable<IApiResponse<any>> {
    return this.httpClient.post<IApiResponse<any>>(
      'gateway/logout',
      {},
      {
        withCredentials: true,
      }
    );
  }

  registration(regUserPayload: IRegUserPayload): Observable<IApiResponse> {
    return this.httpClient.post<IApiResponse>('gateway/registration', regUserPayload);
  }
}
