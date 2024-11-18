import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {PostResponseDto} from '../../Dto/response/postResponseDto';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {Account} from '../../models/account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createPostForm: any;
  posts: PostResponseDto[];
  loading: boolean = false;
  currUser: User;
  currAccount: Account;
  maxContentLength: number = 140;

  constructor(private postService: PostService, private authService: AuthService, private userService: UserService,
              private formBuilder: FormBuilder, private alertService: AlertService) {
    this.createPostForm = FormGroup;
  }

  ngOnInit(): void {
    this.onGetAllPosts();
    this.setupPostForm();
    this.currUser = this.userService.getCurrentUser();

    this.userService.getUserAccount().subscribe(
      (resData) => {
        this.currAccount = resData;
      },
      (errorRes) => {
        console.log(errorRes);
      }
    );

    this.alertService.successSubject.subscribe(isSuccess => {
      this.loading = isSuccess;
      this.onGetAllPosts();
    });
    this.alertService.failureSubject.subscribe(isFailure => {
      this.loading = isFailure;
      this.onGetAllPosts();
    });
  }

  onGetAllPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => {
          this.posts = posts;
          this.posts.sort(this.postService.orderPostsByDateAsc);
        }, errorRes => {
          console.log(errorRes);
          this.setAlertValues(false, 'Error while fetching posts');
        }
      );
  }

  setupPostForm(): void {
    this.createPostForm = this.formBuilder.group({
      content: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onCreatePost(): void {
    if (this.createPostForm.valid) {
      this.postService.addPost(this.createPostForm).subscribe(
        (resData) => {
          this.createPostForm.reset();
          this.onGetAllPosts();
          this.setAlertValues(true, 'Post created succesfully');
          console.log(resData);
        },
        (errorRes) => {
          console.log(errorRes);
          this.setAlertValues(false, 'Error while creating post');
        }
      );
    }
  }

  setAlertValues(status: boolean, message: string) {
    this.alertService.successSubject.next(status);
    this.alertService.failureSubject.next(!status);
    this.alertService.messageSubject.next(message);
  }
}
