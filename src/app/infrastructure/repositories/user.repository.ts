import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse } from '../../shared/models';
import { Observable } from 'rxjs';
import { IUserInfo } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  private readonly httpClient = inject(HttpClient);

  me(): Observable<IApiResponse<IUserInfo>> {
    return this.httpClient.get<IApiResponse<IUserInfo>>('gateway/me', {
      withCredentials: true
    });
  }
}
