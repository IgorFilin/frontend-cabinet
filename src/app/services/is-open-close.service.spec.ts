/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IsOpenCloseService } from './is-open-close.service';

describe('Service: IsOpenClose', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsOpenCloseService]
    });
  });

  it('should ...', inject([IsOpenCloseService], (service: IsOpenCloseService) => {
    expect(service).toBeTruthy();
  }));
});
