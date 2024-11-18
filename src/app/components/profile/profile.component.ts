import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Account} from '../../models/account';
import {PostService} from '../../services/post.service';
import {User} from '../../models/user';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../services/alert.service';
import {EditProfileComponent} from '../core/edit-profile/edit-profile.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error = null;
  currProfile: Account;
  accountId: number
  currUser: User;
  loading: boolean = false;
  url: string = '';

  constructor(private router: Router, private userService: UserService, private postService: PostService, public modalService: NgbModal, private alertService: AlertService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const p = localStorage.getItem('account')
    if (p != null) {
      this.currProfile = JSON.parse(p);
    }
    this.currUser = this.userService.getCurrentUser();
    this.accountId = +this.currProfile.id
  }

  onEditProfile() {
    let prevContent = this.currUser;
    const modalRef = this.modalService.open(EditProfileComponent);
    modalRef.componentInstance.user = this.currUser;
    modalRef.componentInstance.account = this.currProfile;
    modalRef.result.then((result) => {
      if (result) {
        this.userService.updateUserProfile(result).pipe(first())
          .subscribe(
            responseData => {
              this.setAlertValues(true, 'Update successful');
              console.log(responseData);
              this.authService.logout().subscribe()
              this.router.navigate(['login'], {queryParams: {updated: 'true'}});
            }, errorRes => {
              this.currUser = prevContent;
              this.setAlertValues(false, 'Error while updating account');
              console.log(errorRes);
            }
          );
      }
    });
  }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }
}
