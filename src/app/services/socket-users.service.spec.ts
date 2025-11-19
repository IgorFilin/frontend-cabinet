import { TestBed } from '@angular/core/testing';

import { SocketUsersService } from './socket-users.service';

describe('SocketUsersService', () => {
  let service: SocketUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
