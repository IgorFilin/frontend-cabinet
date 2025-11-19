import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth$.pipe(
      take(1),
      map((isAuth) => {
        if (isAuth) {
          // Редирект на защищённую страницу — например, dashboard или '/'
          this.router.navigate(['/']); // или ['/dashboard']
          return false;
        }
        return true;
      })
    );
  }
}
