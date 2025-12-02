import { TestBed } from '@angular/core/testing';
import { SocketUsersService } from './socket-users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SocketUsersService', () => {
  let service: SocketUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SocketUsersService]
    });
    service = TestBed.inject(SocketUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});