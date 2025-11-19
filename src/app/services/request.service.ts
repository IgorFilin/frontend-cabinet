import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T, R>(path: string, params?: T, api: string = this.apiUrl, withCredentials = true): Observable<R> {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        httpParams = httpParams.append(key, params[key] as string);
      }
    }

    return this.http.get<R>(`${api}/${path}`, {
      params: httpParams,
      withCredentials,
    });
  }

  post<T, R>(path: string, body: T, api: string = this.apiUrl): Observable<R> {
    return this.http.post<R>(`${api}/${path}`, body, {
      withCredentials: true,
    });
  }

  patch<T, R>(path: string, body: T, api: string = this.apiUrl): Observable<R> {
    return this.http.patch<R>(`${api}/${path}`, body, {
      withCredentials: true,
    });
  }

  put<T, R>(path: string, body: T, api: string = this.apiUrl): Observable<R> {
    return this.http.put<R>(`${api}/${path}`, body, {
      withCredentials: true,
    });
  }

  delete<T, R>(path: string, body: T, api: string = this.apiUrl): Observable<R> {
    return this.http.delete<R>(`${api}/${path}`, {
      body,
      withCredentials: true,
    });
  }
}
