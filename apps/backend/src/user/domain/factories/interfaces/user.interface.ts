import { UserData } from '../../models/interfaces/user.interface';

export interface CreateUser extends Omit<UserData, 'id'> {
  id?: string;
}
