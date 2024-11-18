export class PostDto {
  accountId: number;
  content: string;
  postDate: Date;

  constructor(accountdId: number, content: string, postDate: Date) {
    this.accountId = accountdId;
    this.content = content;
    this.postDate = postDate;
  }
}
