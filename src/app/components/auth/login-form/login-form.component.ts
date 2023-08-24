import { AfterContentChecked, Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Utilities } from '../../../utilities/utilities';

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

  onSubmit() {
    this.loginSub = this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (data: any) => {
          this.authService.setTokenInStorage(data.token);
          this.authService.setUsernameInStorage(data.username);
          this.router
            .navigate(this.next ? [`/${this.next}`] : ['/'])
            .then(() =>
              this.messageService.add(
                Utilities.customToastSuccessMessage('Logged in'),
              ),
            );
        },
        error: (err) =>
          this.messageService.add(Utilities.customToastErrorMessage(err)),
      });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
