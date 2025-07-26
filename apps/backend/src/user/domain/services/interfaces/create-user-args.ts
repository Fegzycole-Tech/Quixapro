import { UserData } from '../../models/interfaces/user.interface';

export interface CreateUserArgs extends Omit<UserData, 'id'> {}
