import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isAuth = signal(false);
  destroyRef = inject(DestroyRef);

  setAuthData(isAuthPayload: boolean = false) {
    this.isAuth$.next(isAuthPayload);
    this.isAuth.set(isAuthPayload);
  }
}
