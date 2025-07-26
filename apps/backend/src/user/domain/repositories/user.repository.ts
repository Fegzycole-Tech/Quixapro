import { Injectable, Logger } from '@nestjs/common';
import { mapUser, optimisticMapUser } from './helpers/map-user.helper';
import { DatabaseService } from '../../../database/services/database.service';
import { FindUser } from './interfaces/find-user.interface';
import { User } from '../models/user.model';
import { User as UserEntity } from '@db/prisma';

@Injectable()
export class UserRepository extends DatabaseService {
  readonly #logger: Logger = new Logger(this.constructor.name);

  /**
   * Persist a user aggregate root.
     @param data data of the user to be created or updated
   * @returns {Promise<User>} Created / Updated user
   */
  async save(data: User): Promise<User> {
    const msg: string = `Saving User with id '${data.id}'`;
    this.#logger.debug(`${msg}`);

    try {
      const user: UserEntity = await this.user.upsert({
        where: { id: data.id },
        create: {
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          photoUrl: data.photoUrl,
        },
        update: {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          photoUrl: data.photoUrl,
        },
      });

      return optimisticMapUser(user);
    } catch (err) {
      this.#logger.error(`${msg} - Failed`, err, data);
      throw err;
    }
  }

  /**
   * Find a user.
     @param data id AND/OR email of the user to be found
   * @returns {Promise<User | null>} Found user or null
   */
  async findOne({ id, email }: FindUser): Promise<User | null> {
    const msg: string = `Finding user '${JSON.stringify({ id, email })}'`;
    this.#logger.debug(`${msg}`);

    try {
      const user: UserEntity | null = await this.user.findFirst({
        where: { id, email },
      });

      return mapUser(user);
    } catch (err) {
      this.#logger.error(`${msg} - Failed`, err, { id, email });
      throw err;
    }
  }
}
