import { User } from '../models/user.model';

export class GetUserResponse {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
