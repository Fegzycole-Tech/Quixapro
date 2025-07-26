import { CreateUserArgs } from './interfaces/create-user-args';
import { FindUserArgs } from './interfaces/find-user-args';
import { GetUserFailureException } from '../exceptions/get-user-failure.exception';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserCreationFailureException } from '../exceptions/user-creation-failure.exception';
import { UserFactory } from '../factories/user.factory';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly factory: UserFactory,
  ) {}

  /**
   * Create a new user
   * @param {CreateUserArgs} data data user is to be created with
   * @returns {Promise<User>}
   * @throws {UserCreationFailureException} If the user cannot be created.
   */
  async create(data: CreateUserArgs): Promise<User> {
    try {
      // Create the new user
      const createdUser: User = this.factory.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        photoUrl: data.photoUrl,
      });

      // Persist and return the new record
      return await this.repository.save(createdUser);
    } catch (error) {
      throw new UserCreationFailureException();
    }
  }

  async get(data: FindUserArgs): Promise<User> {
    try {
      const user: User | null = await this.repository.findOne(data);

      if (!user) {
        throw new UserNotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw error;
      }

      throw new GetUserFailureException();
    }
  }
}
