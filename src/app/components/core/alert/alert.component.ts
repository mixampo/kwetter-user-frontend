import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() success: boolean = false;
  @Input() failure: boolean = false;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.successSubject.subscribe(isSuccess => {
      this.success = isSuccess;
    });
    this.alertService.failureSubject.subscribe(isFailure => {
      this.failure = isFailure;
    });
    this.alertService.messageSubject.subscribe(message => {
      this.message = message;
    });
  }
}
