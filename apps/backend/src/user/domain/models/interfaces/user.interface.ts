export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}