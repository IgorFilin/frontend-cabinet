/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionAnswerService } from './question-answer.service';

describe('Service: QuestionAnswer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAnswerService]
    });
  });

  it('should ...', inject([QuestionAnswerService], (service: QuestionAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
