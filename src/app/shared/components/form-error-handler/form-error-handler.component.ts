import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-form-error-handler',
    imports: [CommonModule],
    templateUrl: './form-error-handler.component.html',
    styleUrl: './form-error-handler.component.scss'
})
export class FormErrorHandlerComponent {
  @Input() errorFormObject?: any;
  @Input() errorMessage?: string;
  @Input() showError?: boolean | null;
}
