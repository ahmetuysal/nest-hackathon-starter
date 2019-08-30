import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupRequest } from '../contract';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<User> {
    const newUser = new User();
    newUser.username = signupRequest.username.toLowerCase();
    newUser.email = signupRequest.email;
    newUser.passwordHash = passwordHash;
    newUser.firstName = signupRequest.firstName;
    newUser.lastName = signupRequest.lastName;
    newUser.middleName = signupRequest.middleName;
    newUser.registrationDate = new Date();
    try {
      // insert also updates id of newUser, we can directly return newUser
      await this.userRepository.insert(newUser);
      return newUser;
    } catch (err) {
      // TODO: err also returns pwd hash :)
      throw new ConflictException(err);
    }
  }
}
