import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './model/user.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private API_URL = environment.apiUrl;
  isLoggedIn = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post(`${this.API_URL}/auth/login`, { email, password })
      .pipe(
        tap((resData: any) => {
          this.handleAuthentication(resData.token, resData.user);

        })
      );
  }

  private handleAuthentication(token: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(email));
    this.isLoggedIn.next(true);
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
  }

  getAuthData() {
    const token: string = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
      return null;
    }

    return {
      token,
      user,
    };
  }
}
