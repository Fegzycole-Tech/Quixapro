import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../../database/services/database.service';
import { User } from '../models/user.model';
import { User as UserEntity } from '@db/prisma';
import { optimisticMapUser } from './helpers/map-user.helper';

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
}
