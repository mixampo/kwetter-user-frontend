import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
  @Input() public confirm: boolean;
  @Output() passConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  passBackDeletePostConfirmation() {
    this.confirm = true
    this.passConfirmation.emit(this.confirm);
    this.activeModal.close(this.confirm);
  }

  passBackDeletePostCancel() {
    this.confirm = false
    this.passConfirmation.emit(this.confirm)
    this.activeModal.close(this.confirm);
  }
}
