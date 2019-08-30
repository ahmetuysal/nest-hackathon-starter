import { User as IUser } from '../contract';
import { User } from './user.entity';

export function toUserEntity(userModel: IUser): User {
  const userEntity = new User();
  userEntity.id = userModel.id;
  userEntity.username = userModel.username;
  userEntity.email = userModel.email;
  userEntity.firstName = userModel.firstName;
  userEntity.lastName = userModel.lastName;
  userEntity.middleName = userModel.middleName;
  userEntity.image = userModel.image;
  userEntity.emailVerified = userModel.emailVerified;
  userEntity.birthDate = userModel.birthDate;
  userEntity.registrationDate = userModel.registrationDate;
  return userEntity;
}

export function toUserModel(userEntity: User): IUser {
  const userModel = new User();
  userModel.id = userEntity.id;
  userModel.username = userEntity.username;
  userModel.email = userEntity.email;
  userModel.firstName = userEntity.firstName;
  userModel.lastName = userEntity.lastName;
  userModel.middleName = userEntity.middleName;
  userModel.image = userEntity.image;
  userModel.emailVerified = userEntity.emailVerified;
  userModel.birthDate = userEntity.birthDate;
  userModel.registrationDate = userEntity.registrationDate;
  return userModel;
}
