import { Injectable, signal, WritableSignal } from '@angular/core';
import { IUserInfo } from '../models/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoleType } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userInfo = new BehaviorSubject<IUserInfo | null>(null);
  userRole: WritableSignal<RoleType | ''> = signal('');

  constructor() {
    this.userInfo.subscribe((userData) => {
      const userResponseData = userData as IUserInfo;
      this.userRole.set(userResponseData?.role || '');
    });
  }
}
