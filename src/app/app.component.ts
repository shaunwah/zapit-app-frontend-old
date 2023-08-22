import { AfterContentChecked, Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  private authService = inject(AuthService);
  title = 'Zapit';
  isAuthenticated!: boolean;

  ngAfterContentChecked() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
