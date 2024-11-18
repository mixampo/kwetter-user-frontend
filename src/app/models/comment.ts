import {Post} from './post';

export class comment {
  id: number;
  accountId: number;
  post: Post;
  content: string;

  constructor(id: number, accountId: number, post: Post, content: string) {
    this.id = id;
    this.accountId = accountId;
    this.post = post;
    this.content = content;
  }
}
