import {Post} from './post';

export class heart {
  id: number;
  accountId: number;
  post: Post;

  constructor(id: number, accountId: number, post: Post) {
    this.id = id;
    this.accountId = accountId;
    this.post = post;
  }
}
