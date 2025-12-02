/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { QuestionAnswerService } from './question-answer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('QuestionAnswer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAnswerService],
      imports: [HttpClientTestingModule,  ToastrModule.forRoot() ]
    });
  });

  it('should ...', inject([QuestionAnswerService], (service: QuestionAnswerService) => {
    expect(service).toBeTruthy();
  }));
});