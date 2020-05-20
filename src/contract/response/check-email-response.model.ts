export class CheckEmailResponse {
  isEmailAvailable: boolean;

  constructor(isEmailAvailable: boolean) {
    this.isEmailAvailable = isEmailAvailable;
  }
}
