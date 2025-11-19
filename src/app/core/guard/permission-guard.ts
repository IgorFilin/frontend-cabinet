import { effect, inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUserInfo } from '../../models/interfaces';

export const PermissionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const injector = inject(Injector);

  return userService.userInfo.asObservable().pipe(
    map((data) => {
      const responseUserData = data as IUserInfo;
      switch (route.routeConfig?.path) {
        case 'questions':
        case 'terminal':
        case 'games':
          if (responseUserData.role === 'admin') return true;
          else return false;
        default:
          return true;
      }
    })
  );
};
