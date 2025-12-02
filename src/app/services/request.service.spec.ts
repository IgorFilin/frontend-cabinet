/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RequestService } from './request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));
});