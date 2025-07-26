import { CreateUser } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

/**
 * Factory for creating a new user.
 * This service encapsulates all the logic to ensure the Factory Aggregate is in a valid state.
 */
@Injectable()
export class UserFactory {
  /**
   * Create a new user representation.
   *
   * @returns {User} - The user Aggregate Root.
   */
  create({ id = uuidv4(), email, firstName, lastName, password, photoUrl }: CreateUser): User {
    return new User({
      id,
      email,
      firstName,
      lastName,
      password,
      photoUrl,
    });
  }
}
