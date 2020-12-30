export class CheckUsernameResponse {
  isUsernameAvailable: boolean;

  constructor(isUsernameAvailable: boolean) {
    this.isUsernameAvailable = isUsernameAvailable;
  }
}
