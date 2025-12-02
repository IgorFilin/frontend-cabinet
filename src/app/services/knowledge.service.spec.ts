/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { KnowledgeService } from './knowledge.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('Service: Knowledge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
       ],
      providers: [KnowledgeService]
    });
  });

  it('should ...', inject([KnowledgeService], (service: KnowledgeService) => {
    expect(service).toBeTruthy();
  }));
});
