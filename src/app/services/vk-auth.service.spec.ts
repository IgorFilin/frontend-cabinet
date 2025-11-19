/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VkAuthService } from './vk-auth.service';

describe('Service: VkAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VkAuthService]
    });
  });

  it('should ...', inject([VkAuthService], (service: VkAuthService) => {
    expect(service).toBeTruthy();
  }));
});
