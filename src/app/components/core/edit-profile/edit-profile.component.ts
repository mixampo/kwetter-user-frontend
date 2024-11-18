import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../../models/account';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() public account: Account;
  @Input() public user: User;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  editProfileForm: any;
  accountId: number;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.setupEditProfileForm();
    this.accountId = +this.account.id;
  }

  setupEditProfileForm(): void {
    this.editProfileForm = this.formBuilder.group({
      userId: new FormControl('', []),
      accountId: new FormControl('', []),
      personal: new FormGroup({
        firstName: new FormControl('', []),
        lastName: new FormControl('', []),
        gender: new FormControl('', []),
        dateOfBirth: new FormControl('', []),
      }),
      address: new FormGroup({
        country: new FormControl('', []),
        phoneNumber: new FormControl('', []),
      }),
      email: new FormControl('', [
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$'
        ),
      ]),
    });
  }

  passBackProfileChanges() {
    this.passEntry.emit(this.editProfileForm);
    this.activeModal.close(this.editProfileForm);
  }

}
