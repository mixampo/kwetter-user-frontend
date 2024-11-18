import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PostResponseDto} from '../../../Dto/response/postResponseDto';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  @Input() public post: PostResponseDto;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  maxContentLength: number = 140;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  passBackPostChanges(content: string) {
    this.post.post.content = content;
    this.passEntry.emit(this.post);
    this.activeModal.close(this.post);
  }
}
