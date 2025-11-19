import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IsOpenCloseService } from './is-open-close.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacadeService {

constructor(private authService: AuthService, private openCloseService: IsOpenCloseService ) { }

  resetAppSettings() {
    this.authService.isAuth$.next(false)
    this.openCloseService.dataToggleElements$.next({})
  }
}
