export class GetUserFailureException extends Error {
  constructor(message: string = 'Failed to fetch a user.') {
    super(message);
  }
}
