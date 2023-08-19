import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  readonly apiUrl = '/api';
  readonly httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, {
      headers: this.httpHeaders
    });
  }
}
