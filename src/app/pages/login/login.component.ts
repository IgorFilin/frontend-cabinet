import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormErrorHandlerComponent } from '../../shared/components/form-error-handler/form-error-handler.component';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../shared/components/input/input.component';
import { slideInOutAnimation } from '../../animations/slide-in-out.animations';
import { bubbleAnimation } from '../../animations/bubble.animation';
import { VkAuthService } from '../../services/vk-auth.service';
import { LoginUseCase } from '../../core/use-cases/user/login.use-case';

@Component({
  selector: 'cabinet-login',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [bubbleAnimation],
})
export class LoginComponent implements OnInit {
  constructor(private vkAuthService: VkAuthService, private loginUseCase: LoginUseCase, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit(): void {
    this.vkAuthService.initialVkConfig();
    this.vkAuthService.initialOneTapButton();
  }

  onSubmit() {
    // this.authServise.login(this.loginForm.getRawValue());
    this.loginUseCase.execute(this.loginForm.value).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
    this.loginForm.reset();
  }
}
