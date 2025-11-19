import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading: boolean = false;

  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  startLocalLoading() {
    this._isLoading$.next(true);
  }

  stopLocalLoading() {
    this._isLoading$.next(false);
  }

  get isLocalLoading(): Observable<any> {
    return this._isLoading$;
  }

  startLoading() {
    this._isLoading = true;
  }

  stopLoading() {
    this._isLoading = false;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}
