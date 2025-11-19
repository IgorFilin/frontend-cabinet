import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { TECHNOLOGY_STACK } from '../../shared/models/constants';
import { MarkdownTextareaComponent } from '../../components/markdown-textarea/markdown-textarea.component';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
export type CreateQuestionFormType = {
  question: string;
} & Record<string, string>;

@Component({
  selector: 'cabinet-questions',
  imports: [CommonModule, ReactiveFormsModule, MarkdownTextareaComponent, CustomSelectComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questionForm!: FormGroup;
  techologies: string[] = TECHNOLOGY_STACK;

  constructor(
    private questionAnswerService: QuestionAnswerService,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.questionForm = this.formBuilder.group({
      theme: this.formBuilder.control('', [Validators.required]),
      question: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control(''),
      answers: this.formBuilder.array([
        this.formBuilder.group({
          value: this.formBuilder.control('', [Validators.required]),
          accept: this.formBuilder.control(false, [Validators.required]),
        }),
      ]),
    });
  }

  get answersArray() {
    return this.questionForm.get('answers') as FormArray;
  }

  onHandlerClickAddQuestions() {
    this.answersArray.push(
      this.formBuilder.group({
        value: this.formBuilder.control('', [Validators.required]),
        accept: this.formBuilder.control(false, [Validators.required]),
      })
    );
  }

  onHandlerClickRemoveQuestions() {
    this.answersArray.removeAt(this.answersArray.length - 1);
  }

  onSubmit() {
    this.questionAnswerService.addQuestion$(this.questionForm.getRawValue()).subscribe(() => {
      this.questionForm.reset();
      this.initializeForm();
      this.ref.markForCheck();
    });
  }
}
