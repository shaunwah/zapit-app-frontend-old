import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  readonly apiUrl = '/api';
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );

  getUsers(
    like?: string | null,
    page?: number | null,
    size?: number | null,
    sortColumn?: string | null,
    sortDirection?: number | null,
  ): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      headers: this.httpHeaders,
      params: {
        like: like ?? '',
        page: page ?? '',
        size: size ?? '',
        sortColumn: sortColumn ?? '',
        sortDirection: sortDirection ?? '',
      },
    });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, {
      headers: this.httpHeaders,
    });
  }
}
