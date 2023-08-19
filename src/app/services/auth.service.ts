import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  readonly apiUrl = '/api/auth';
  readonly auth_token = 'AUTH_TOKEN';
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user, {
      headers: this.httpHeaders,
    });
  }

  login(user: User): Observable<User> {
    const authDetails = btoa(`${user.email}:${user.password}`);
    const httpHeaders = new HttpHeaders().set(
      'Authorization',
      `Basic ${authDetails}`,
    );
    return this.http.post<User>(`${this.apiUrl}/login`, null, {
      headers: httpHeaders,
    });
  }

  logout(): void {
    this.clearTokenInSession();
  }

  isAuthenticated(): boolean {
    return this.getTokenInSession() != null;
  }

  setTokenInSession(token: string): void {
    this.clearTokenInSession();
    window.sessionStorage.setItem(this.auth_token, JSON.stringify(token));
  }

  getTokenInSession(): string | null {
    const token = window.sessionStorage.getItem(this.auth_token);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  clearTokenInSession(): void {
    window.sessionStorage.removeItem(this.auth_token);
  }
}
