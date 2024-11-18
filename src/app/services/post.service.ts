import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PostResponseDto} from '../Dto/response/postResponseDto';
import {PostDto} from '../Dto/request/postDto';
import {FormGroup} from '@angular/forms';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';
import {Post} from '../models/post';
import {DeletePostDto} from '../Dto/request/deletePostDto';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.postApiUrl;
  private currDate: Date;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getPosts(): Observable<PostResponseDto[]> {
    return this.http.get<PostResponseDto[]>(this.baseUrl);
  }

  addPost(values: FormGroup) {
    this.currDate = new Date();

    const post = new PostDto(
      this.userService.account.value.id,
      values.get('content')?.value,
      this.currDate
    );

    return this.http.post<Post>(this.baseUrl, post).pipe(
      map((res) => {
        return res;
      })
    );
  }

  editPost(postDto: PostResponseDto) {
    return this.http.put<Post>(this.baseUrl, postDto.post);
  }

  deletePost(deletePostDto: DeletePostDto) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        postId: deletePostDto.postId,
        accountId: deletePostDto.accountId
      },
    };

    return this.http.delete<DeletePostDto>(this.baseUrl, options).pipe(
      map((res) => {
        return res;
      })
    );
  }

  orderPostsByDateAsc(postA: PostResponseDto, postB: PostResponseDto) {
    if (postA.post.postDate < postB.post.postDate) {
      return 1;
    }
    if (postA.post.postDate > postB.post.postDate) {
      return -1;
    }
    return 0;
  }
}
