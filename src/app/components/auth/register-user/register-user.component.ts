import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  registerForm!: FormGroup;
  registerSub?: Subscription;
  loginSub?: Subscription;

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      { validators: this.passwordConfirmValidator },
    );
  }

  ngOnDestroy() {
    this.registerSub?.unsubscribe();
    this.loginSub?.unsubscribe();
  }

  passwordConfirmValidator(control: AbstractControl) {
    return control.value.password === control.value.passwordConfirm
      ? null
      : ({ passwordsDoNotMatch: { value: 'error' } } as ValidationErrors);
  }

  get username() {
    return this.registerForm.get('username')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')!;
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.registerSub = this.authService
      .register({ ...this.registerForm.value })
      .subscribe({
        next: (user) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account registered. Please log in',
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please try again later',
          });
        },
      });
  }
}
