export class UserCreationFailureException extends Error {
  constructor(message: string = 'Failed to create a user.') {
    super(message);
  }
}
