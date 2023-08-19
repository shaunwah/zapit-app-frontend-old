import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
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
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.registerSub?.unsubscribe();
    this.loginSub?.unsubscribe();
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

  onSubmit() {
    console.log(this.registerForm.value);
    this.registerSub = this.authService
      .register({ ...this.registerForm.value })
      .subscribe({
        next: (user) => {
          user.password = this.registerForm.value.password;
          this.loginSub = this.authService.login(user).subscribe({
            next: (data) => {
              this.authService.setTokenInSession((data as any).token);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Registered user',
              });
              this.router.navigate(['/']); // TODO
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Registered user but failed to log in',
              });
            },
          });
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
