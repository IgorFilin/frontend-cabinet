import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { AuthService } from '../../services/auth.service';
import { bubbleAnimation } from '../../animations/bubble.animation';
import { RegistrationUseCase } from '../../core/use-cases/user/registration.use-case';

@Component({
  selector: 'cabinet-registration',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  animations: [bubbleAnimation],
})
export class RegistrationComponent {
  constructor(private authService: AuthService, private registrationUseCase: RegistrationUseCase) {}

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    this.registrationUseCase.execute(this.registrationForm.value).subscribe((data) => {
      console.log('-_-', data);
    });
    // this.authService.registration(this.registrationForm.value);
    this.registrationForm.reset();
  }
}
