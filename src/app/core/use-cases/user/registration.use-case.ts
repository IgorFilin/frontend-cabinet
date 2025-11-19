import { Injectable } from '@angular/core';
import { IRegUserPayload } from '../../../shared/models';
import { of, switchMap } from 'rxjs';
import { AuthRepository } from '../../../infrastructure/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class RegistrationUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(userPayload: IRegUserPayload) {
    return this.authRepository.registration(userPayload).pipe(
      switchMap(({ success }) => {
        if (success) {
          return of(true);
        } else return of(false);
      })
    );
  }
}
