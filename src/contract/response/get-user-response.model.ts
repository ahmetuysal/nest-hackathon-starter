import { User } from '..';

export class GetUserResponse {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
