import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../models/user';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';
import {RegistrationDto} from '../Dto/request/registrationDto';
import {CookieService} from 'ngx-cookie-service';

export interface AuthResponseData {
  message: string;
  data: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  user = new BehaviorSubject<User>(null);
  baseUrl = environment.authApiUrl;
  options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  logUserIn(user: User) {
    return this.http.post<AuthResponseData>(
      `${this.baseUrl}authentication/authenticate`, user, this.options
    ).pipe(
      catchError(errorRes => {
        return throwError(errorRes);
      }), tap(resData => {
        const user = new User(
          resData.data.firstName,
          resData.data.lastName,
          resData.data.email,
          resData.data.gender,
          resData.data.dateOfBirth,
          resData.data.country,
          resData.data.phoneNumber,
          resData.data.roles,
          resData.data.id,
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    );
  }

  // roles: string[];
  // id: string;
  // email: string;
  autoLogIn() {
    const userData: {
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      dateOfBirth: Date;
      country: string;
      phoneNumber: string;
      roles: string[];
      id: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadedUser = new User
    (
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.gender,
      userData.dateOfBirth,
      userData.country,
      userData.phoneNumber,
      userData.roles,
      userData.id,
    );
    if (loadedUser.id) {
      this.user.next(loadedUser);
    }
  }

  register(values: FormGroup): Observable<object> {
    const regDto = new RegistrationDto (
      values.get('personal')?.get('firstName')?.value,
      values.get('personal')?.get('lastName')?.value,
      values.get('email')?.value,
      values.get('personal')?.get('gender')?.value,
      values.get('personal')?.get('dateOfBirth')?.value,
      values.get('address')?.get('country')?.value,
      values.get('address')?.get('phoneNumber')?.value,
      values.get('password')?.value
    )
    return this.http.post(this.baseUrl + 'authentication/register', regDto);
  }

  logout(): any {
    // @ts-ignore
    this.user.next(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('account');

    return this.http.get(this.baseUrl + 'authentication/logout');
  }
}
