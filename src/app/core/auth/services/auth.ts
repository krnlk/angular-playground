import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../pages/models/user-request';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);

  // private baseURL = 'http://localhost:8080/';
  private baseURL = '/api'; // proxy for localhost to avoid CORS

  loginUser(): Observable<boolean> {
    const url = this.baseURL + 'login';
    const body = {};

    return this.httpClient.post<boolean>(url, body);
  }

  registerUser(userRequest: UserRequest): Observable<boolean> {
    const url = this.baseURL + 'register';
    const body = {
      email: userRequest.email,
      login: userRequest.login,
      password: userRequest.password,
      dateOfBirth: userRequest.dateOfBirth,
    };

    return this.httpClient.post<boolean>(url, body);
  }
}
