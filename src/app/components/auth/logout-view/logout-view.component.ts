import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Utilities } from '../../../utilities/utilities';

@Component({
  selector: 'app-logout-view',
  templateUrl: './logout-view.component.html',
  styleUrls: ['./logout-view.component.css'],
})
export class LogoutViewComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.authService.logout();
    this.router
      .navigate(['/login'])
      .then(() =>
        this.messageService.add(
          Utilities.customToastSuccessMessage('Logged out'),
        ),
      );
  }
}
