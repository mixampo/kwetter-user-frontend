export class Post {
  id: number;
  accountId: number;
  content: string;
  postDate: Date;

  constructor(id: number, accountId: number, content: string, postDate: Date) {
    this.id = id;
    this.accountId = accountId;
    this.content = content;
    this.postDate = postDate;
  }
}
