import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupRequest } from '../contract';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  public async getUserEntityById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async getUserEntityByUsername(username: string): Promise<User> {
    const normalizedUsername = username.toLowerCase();
    return this.userRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getUserEntityByEmail(email: string): Promise<User> {
    const normalizedEmail = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getUserEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<User> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.userRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
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
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updatePassword(
    userId: number,
    passwordHash: string,
  ): Promise<void> {
    const userEntity = await this.userRepository.findOne(userId);
    if (userEntity === null || userEntity === undefined) {
      Logger.warn(
        `Password change of non-existent account with id ${userId} is rejected.`,
      );
      throw new NotFoundException();
    }

    userEntity.passwordHash = passwordHash;
    await this.userRepository.update(userEntity.id, userEntity);
  }

  public async updateUser(userEntity: User): Promise<void> {
    // TODO: Email update should be separated
    await UserService.validateUser(userEntity);
    try {
      await this.userRepository.update(userEntity.id, userEntity);
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
  }

  private static async validateUser(user: User): Promise<void> {
    const errors = await validate(user, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
