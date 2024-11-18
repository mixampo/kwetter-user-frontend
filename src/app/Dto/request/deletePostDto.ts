export class DeletePostDto {
  postId: number;
  accountId: number;

  constructor(postId: number, accountId: number) {
    this.postId = postId;
    this.accountId = accountId;
  }
}
