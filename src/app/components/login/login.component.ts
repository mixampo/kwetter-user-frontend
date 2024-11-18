import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = null;
  loading: boolean = false;
  success: boolean = false;
  failure: boolean = false;
  message: string= '';
  // @ts-ignore
  queryParams: ParamMap;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(queryParams => {
        this.queryParams = queryParams;
        if (this.queryParams.get('updated')) {
          if (this.queryParams.get('updated') === 'true') {
            this.setAlertValues(true, 'Profile updated re-login required');
          } else {
            this.setAlertValues(false, 'Profile could not be updated');
          }
        } else if (this.queryParams.get('registered')) {
          if (this.queryParams.get('registered') === 'true') {
            this.setAlertValues(true, 'Registration successful');
          } else {
            this.setAlertValues(false, 'Account could not be created');
          }
        } else if (this.queryParams.get('logout')) {
          this.setAlertValues(true, 'Logout successful');
        }
      });
  }

  onLogin(form: NgForm) {
    this.loading = true;
    this.error = null;

    this.authService.logUserIn(form.value)
      .subscribe(resData => {
        this.loading = false;
        console.log(resData);
        this.router.navigate(['/home']);
      }, error => {
        this.error = error;
        this.loading = false;
        form.reset();
        this.setAlertValues(false, 'Wrong credentials provided, please try again');
        console.log(error);
      });
    // this.userService.getUserAccount().subscribe(resData => {
    // });
  }

  setAlertValues(status: boolean, message: string) {
    this.success = status;
    this.failure = !status;
    this.message = message;
  }
}
