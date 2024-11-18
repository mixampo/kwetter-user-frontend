import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Account} from '../models/account';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {EditProfileDto} from '../Dto/request/editProfileDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.accountApiUrl;
  // @ts-ignore
  account = new BehaviorSubject<Account>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getCurrentUser() {
    return this.authService.user.value;
  }

  getUserAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}user/${this.getCurrentUser().id}`).pipe(
      catchError(errorRes => {
        return throwError(errorRes);
      }), tap(resData => {
        this.account.next(resData);
        localStorage.setItem('account', JSON.stringify(resData));
      })
    );
  }

  updateUserProfile(values: FormGroup): Observable<object> {
    const editProfileDto = new EditProfileDto(
      values.get('userId')?.value,
      +values.get('accountId')?.value,
      values.get('personal')?.get('firstName')?.value,
      values.get('personal')?.get('lastName')?.value,
      values.get('email')?.value,
      values.get('personal')?.get('gender')?.value,
      values.get('personal')?.get('dateOfBirth')?.value,
      values.get('address')?.get('country')?.value,
      values.get('address')?.get('phoneNumber')?.value,
      values.get('password')?.value
    );
    console.log(editProfileDto);
    return this.http.put(this.baseUrl, editProfileDto);
  }
}
