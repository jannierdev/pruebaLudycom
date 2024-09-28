import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService
  ) { }

  login(data: string) {
    return this.http.post('/login', data);
  }

  get token() {
    const token = localStorage.getItem('token');
    if (token === null) {
      throw new Error('Token not found in local storage');
    }
    return token;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get user() {
    const user = localStorage.getItem('user');
    if (user === null) {
      throw new Error('User not found in local storage');
    }
    return user;
  }

  set user(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}