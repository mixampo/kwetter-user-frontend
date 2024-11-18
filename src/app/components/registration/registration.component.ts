import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;
  loading = false;
  error = null;
  connectionError = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.registrationForm = FormGroup;
  }

  ngOnInit(): void {
    this.setupRegistrationForm();
  }

  setupRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      personal: new FormGroup({
        firstName: new FormControl('', [
          Validators.required
        ]),
        lastName: new FormControl('', [
          Validators.required
        ]),
        gender: new FormControl('', [
          Validators.required
        ]),
        dateOfBirth: new FormControl('', [
          Validators.required
        ]),
      }),
      address: new FormGroup({
        country: new FormControl('', [
          Validators.required
        ]),
        phoneNumber: new FormControl('', [
          Validators.required
        ]),
      }),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$'
        ),
      ]),
    });
  }

  onRegistration() {
    this.registrationForm.markAllAsTouched();
    this.loading = true;
    this.error = null;

    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm)
        .pipe(first())
        .subscribe(
          responseData => {
            console.log(responseData);
            this.router.navigate(['login'], {queryParams: {registered: 'true'}});
            this.loading = false;
          }, errorRes => {
            this.loading = false;
            this.error = errorRes;
            console.log(errorRes);
            this.registrationForm.reset();
          }
        );
    }
  }
}
