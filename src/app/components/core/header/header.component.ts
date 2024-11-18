import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe()
    this.router.navigate(['login'], {queryParams: {logout: 'true'}});
  }
}
