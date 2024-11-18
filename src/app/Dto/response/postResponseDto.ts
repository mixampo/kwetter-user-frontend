import {Post} from '../../models/post';
import {heart} from '../../models/heart';
import {comment} from '../../models/comment';

export class PostResponseDto {
  post: Post;
  hearts: heart[];
  comments: comment[];

  constructor(post: Post, hearts: heart[], comments: comment[]) {
    this.post = post;
    this.hearts = hearts;
    this.comments = comments;
  }
}
