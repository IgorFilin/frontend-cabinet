import { signalStore, withComputed, withProps } from '@ngrx/signals';
import { rxResource } from '@angular/core/rxjs-interop';
import { computed, inject } from '@angular/core';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { EMPTY } from 'rxjs';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withProps((_, authService = inject(AuthService), userApi = inject(UserRepository)) => ({
    _recource: rxResource({
      request: () => authService.isAuth(),
      loader: ({ request }) => {
        if (!request) return EMPTY;
        return userApi.me();
      },
    }).asReadonly(),
  })),
  withComputed((store) => ({
    userInfoData: computed(() => store._recource.value()?.data),
    isLoading: computed(() => store._recource.isLoading()),
    userId: computed(() => store._recource.value()?.data?.id),
  }))
);
