import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Kwetter';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.autoLogIn()
  }
}
