import { AggregateRoot } from '@nestjs/cqrs';
import { UserData } from './interfaces/user.interface';

/**
 * User model represents a single User
 */
export class User extends AggregateRoot {
  /** Unique identifier of the User */
  #id: string;
  /** The first name of the User */
  #firstName: string;
  /** The last name of the User */
  #lastName: string;
  /** The user's image */
  #photoUrl?: string;
  /** The email of the User */
  #email: string;
  /** The password of the User */
  #password?: string;
  /** The date the user was created */
  #createdAt: Date;
  /** The date of the latest user update */
  #updatedAt: Date;

  constructor(data: UserData) {
    super();
    const {
      id,
      firstName,
      lastName,
      photoUrl,
      email,
      password,
      createdAt = new Date(),
      updatedAt = new Date(),
    }: UserData = data;
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#photoUrl = photoUrl;
    this.#email = email;
    this.#password = password;
    this.#email = email;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  /**
   * Get the id of the User
   * @returns {string} - The id of the User
   */
  get id(): string {
    return this.#id;
  }

  /**
   * Get the first name of the User
   * @returns {string} - The first name of the User
   */
  get firstName(): string {
    return this.#firstName;
  }

  /**
   * Set the first name of the User
   * @param {string | undefined} firstName - The first name of the User
   */
  set firstName(firstName: string | undefined) {
    if (firstName) {
      this.#firstName = firstName;
    }
  }

  /**
   * Get the last name of the User
   * @returns {string} - The last name of the User
   */
  get lastName(): string {
    return this.#lastName;
  }

  /**
   * Set the last name of the User
   * @param {string | undefined} lastName - The last name of the User
   */
  set lastName(lastName: string | undefined) {
    if (lastName) {
      this.#lastName = lastName;
    }
  }

  /**
   * Get the email of the User
   * @returns {string} - The email of the User
   */
  get email(): string {
    return this.#email;
  }

  /**
   * Set the email of the User
   * @param {string | undefined} email - The email of the User
   */
  set email(email: string | undefined) {
    if (email) {
      this.#email = email;
    }
  }

  /**
   * Get the photo url of the User
   * @returns {string | undefined} - The photo url of the User
   */
  get photoUrl(): string | undefined {
    return this.#photoUrl;
  }

  /**
   * Set the photo url of the User
   * @param {string | undefined} photoUrl - The photoUrl of the User
   */
  set photoUrl(photoUrl: string | undefined) {
    if (photoUrl) {
      this.#photoUrl = photoUrl;
    }
  }

  /**
   * Get the password of the User
   * @returns {string | undefined} - The password of the User
   */
  get password(): string | undefined {
    return this.#password;
  }

  /**
   * Set the password of the User
   * @param {string | undefined} password - The password of the User
   */
  set password(password: string | undefined) {
    if (this)
    this.#password = password;
  }

  /**
   * Get the createdAt of the User
   * @returns {Date} - The createdAt date of the User
   */
  get createdAt(): Date {
    return this.#createdAt;
  }

  /**
   * Get the updatedAt of the User
   * @returns {Date} - The updatedAt date of the User
   */
  get updatedAt(): Date {
    return this.#updatedAt;
  }
}
