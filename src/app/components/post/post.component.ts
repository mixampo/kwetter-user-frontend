import {Component, Input, OnInit} from '@angular/core';
import {PostResponseDto} from '../../Dto/response/postResponseDto';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {DeletePostDto} from '../../Dto/request/deletePostDto';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditPostComponent} from '../core/edit-post/edit-post.component';
import {DeletePostComponent} from '../core/delete-post/delete-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostResponseDto;
  accountId: number;

  constructor(private userService: UserService, private postService: PostService, private alertService: AlertService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    let val = JSON.parse(<string> localStorage.getItem('account'))
    this.accountId = +val.id
    console.log(this.accountId)
  }

  onDeletePost() {
    const modalRef = this.modalService.open(DeletePostComponent);
    modalRef.result.then((confirm) => {
      if (confirm) {
        this.postService.deletePost(new DeletePostDto(this.post.post.id, this.accountId))
          .pipe(first())
          .subscribe(
            resData => {
              this.setAlertValues(true, 'Delete successful');
              console.log(resData);
            }, errorRes => {
              this.setAlertValues(false, 'Error while deleting post');
              console.log(errorRes);
            }
          );
      }
    });
  }

  onEditPost() {
    let prevContent = this.post.post.content;
    const modalRef = this.modalService.open(EditPostComponent);
    modalRef.componentInstance.post = this.post;
    modalRef.result.then((result) => {
      if (result) {
        this.postService.editPost(result).pipe(first())
          .subscribe(
            responseData => {
              this.setAlertValues(true, 'Update successful');
              console.log(responseData);
            }, errorRes => {
              this.post.post.content = prevContent;
              this.setAlertValues(false, 'Error while updating post');
              console.log(errorRes);
            }
          );
      }
    });
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }

}
