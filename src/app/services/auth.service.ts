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
  readonly accessToken = 'access_token';
  readonly username = 'username';
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );

  register(user: User): Observable<User> {
    console.log(user);
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
    this.clearTokenInStorage();
    this.clearUsernameInStorage();
  }

  isAuthenticated(): boolean {
    return this.getTokenInStorage() != null;
  }

  setTokenInStorage(token: string): void {
    this.clearTokenInStorage();
    localStorage.setItem(this.accessToken, token);
  }

  setUsernameInStorage(username: string): void {
    this.clearUsernameInStorage();
    localStorage.setItem(this.username, username);
  }

  getTokenInStorage(): string | null {
    const token = localStorage.getItem(this.accessToken);
    if (token) {
      return token;
    }
    return null;
  }

  getUsernameInStorage(): string | null {
    const username = localStorage.getItem(this.username);
    if (username) {
      return username;
    }
    return null;
  }

  clearTokenInStorage(): void {
    localStorage.removeItem(this.accessToken);
  }

  clearUsernameInStorage(): void {
    localStorage.removeItem(this.username);
  }
}
