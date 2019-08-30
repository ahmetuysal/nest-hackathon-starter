import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, FindConditions } from 'typeorm';
import { SignupRequest } from '../contract';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUserEntityById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async getUserEntityByUsername(username: string): Promise<User> {
    username = username.toLowerCase();
    return await this.userRepository.findOne({ where: { username } });
  }

  public async getUserEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<User> {
    identifier = identifier.toLowerCase();
    return await this.userRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }

  public async createUser(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<User> {
    const newUser = new User();
    newUser.username = signupRequest.username.toLowerCase();
    newUser.email = signupRequest.email.toLowerCase();
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
