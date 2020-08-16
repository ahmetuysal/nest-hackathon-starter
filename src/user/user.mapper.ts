import { User as IUser } from '../contract';
import { User } from './user.entity';

export function toUserEntity(userModel: IUser): User {
  if (userModel === null || userModel === undefined) {
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
  if (userEntity === null || userEntity === undefined) {
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
): User {
  const updatedUserEntity = new User();
  // id cannot change
  updatedUserEntity.id = userEntity.id;
  updatedUserEntity.username = (userModel.username !== undefined)
    ? userModel.username : userEntity.username;
  // email update is separated
  updatedUserEntity.email = userEntity.email;
  // email verification is separated
  updatedUserEntity.emailVerified = userEntity.emailVerified;
  updatedUserEntity.firstName = (userModel.firstName !== undefined)
    ? userModel.firstName : userEntity.firstName;
  updatedUserEntity.lastName = (userModel.lastName !== undefined)
    ? userModel.lastName : userEntity.lastName;
  updatedUserEntity.middleName = (userModel.middleName !== undefined)
    ? userModel.middleName : userEntity.middleName;
  updatedUserEntity.image = (userModel.image !== undefined)
    ? userModel.image : userEntity.image;
  updatedUserEntity.birthDate = (userModel.birthDate !== undefined)
    ? userModel.birthDate : userEntity.birthDate;
  // registrationDate can't be updated
  updatedUserEntity.registrationDate = userEntity.registrationDate;
  return updatedUserEntity;
}
