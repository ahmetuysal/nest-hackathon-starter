import { User } from '../models/user.model';

export class GetUserResponse {
  constructor(public user: User) {}
}
