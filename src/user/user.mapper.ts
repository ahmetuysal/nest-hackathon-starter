import { User as IUser } from '../contract';
import { User } from './user.entity';
import { isNullOrUndefined } from 'util';

export function toUserEntity(userModel: IUser): User {
  if (isNullOrUndefined(userModel)) {
    return null;
  }
  const userEntity = new User();
  userEntity.id = userModel.id;
  userEntity.username = userModel.username;
  userEntity.email = userModel.email;
  userEntity.emailVerified = userModel.emailVerified;
  userEntity.firstName = userModel.firstName;
  userEntity.lastName = userModel.lastName;
  userEntity.middleName = userModel.middleName;
  userEntity.image = userModel.image;
  userEntity.birthDate = userModel.birthDate;
  userEntity.registrationDate = userModel.registrationDate;
  return userEntity;
}

export function toUserModel(userEntity: User): IUser {
  if (isNullOrUndefined(userEntity)) {
    return null;
  }
  const userModel = new User();
  userModel.id = userEntity.id;
  userModel.username = userEntity.username;
  userModel.email = userEntity.email;
  userModel.emailVerified = userEntity.emailVerified;
  userModel.firstName = userEntity.firstName;
  userModel.lastName = userEntity.lastName;
  userModel.middleName = userEntity.middleName;
  userModel.image = userEntity.image;
  userModel.birthDate = userEntity.birthDate;
  userModel.registrationDate = userEntity.registrationDate;
  return userModel;
}

/**
 * Updates userEntity's fields with userModel's defined field values.
 * Ignores relations. Does not update some fields' values (id, email,
 * emailVerified, registrationDate) on purpose.
 * @param userEntity Entity to update fields
 * @param userModel Model that contains new values
 */
export function updateUserEntityFields(
  userEntity: User,
  userModel: IUser,
): void {
  // id cannot change
  if (userModel.username !== undefined) {
    userEntity.username = userModel.username;
  }
  // email update is separated
  // email verification is separated
  if (userModel.firstName !== undefined) {
    userEntity.firstName = userModel.firstName;
  }
  if (userModel.lastName !== undefined) {
    userEntity.lastName = userModel.lastName;
  }
  if (userModel.middleName !== undefined) {
    userEntity.middleName = userModel.middleName;
  }
  if (userModel.image !== undefined) {
    userEntity.image = userModel.image;
  }
  if (userModel.birthDate !== undefined) {
    userEntity.birthDate = userModel.birthDate;
  }
  // registrationDate can't be updated
}
