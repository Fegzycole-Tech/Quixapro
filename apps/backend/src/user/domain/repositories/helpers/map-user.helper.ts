import { User } from '../../models/user.model';
import { User as UserEntity } from '@db/prisma';
import { convertNullToUndefined } from './convert-null-to-undefined.helper';

export function optimisticMapUser(user: UserEntity): User {
  return new User({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: convertNullToUndefined(user.password),
    photoUrl: convertNullToUndefined(user.photoUrl),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
}

export function mapUser(user: UserEntity | null): User | null {
  if (!user) {
    return null;
  }
  return optimisticMapUser(user);
}
