import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged out',
    });
    this.router.navigate(['/login']);
  }
}
