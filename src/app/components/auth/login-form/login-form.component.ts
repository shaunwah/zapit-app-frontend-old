import { AfterContentChecked, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit, AfterContentChecked {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  next?: string | null;
  loginForm!: FormGroup;
  loginSub?: Subscription;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    this.next = this.route.snapshot.queryParamMap.get('next');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngAfterContentChecked() {
    this.next = this.route.snapshot.queryParamMap.get('next');
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.loginSub = this.authService
      .login({ ...this.loginForm.value })
      .subscribe({
        next: (data) => {
          this.authService.setTokenInStorage((data as any).token);
          this.authService.setUsernameInStorage((data as any).username);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged in',
          });
          console.log(this.next);
          if (this.next) {
            this.router.navigate([`/${this.next}`]);
            return;
          }
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email and/or password',
          });
        },
      });
  }
}
