import { TestBed } from '@angular/core/testing';

import { RegistrationUseCase } from './registration.use-case';

describe('RegistrationUseCaseTsService', () => {
  let service: RegistrationUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
