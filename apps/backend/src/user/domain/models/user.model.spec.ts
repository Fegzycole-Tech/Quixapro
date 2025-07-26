import { User } from './user.model';
import { faker } from '@faker-js/faker';

describe('Model: User', () => {
  let user: User;

  beforeEach(() => {
    user = new User({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photoUrl: faker.internet.url(),
    });
  });

  it('should instantiate a user', () => {
    expect(user.id).toBeDefined();
    expect(user.firstName).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.photoUrl).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should set first name', () => {
    // Arrange
    const firstName: string = faker.person.firstName();

    // Act & Assert
    user.firstName = firstName;
    expect(user.firstName).toBe(firstName);
  });

  it('should set last name', () => {
    // Arrange
    const lastName: string = faker.person.lastName();

    // Act & Assert
    user.lastName = lastName;
    expect(user.lastName).toBe(lastName);
  });

  it('should set email', () => {
    // Arrange
    const email: string = faker.internet.email();

    // Act & Assert
    user.email = email;
    expect(user.email).toBe(email);
  });

  it('should set password', () => {
    // Arrange
    const password: string = faker.internet.password();

    // Act & Assert
    user.password = password;
    expect(user.password).toBe(password);
  });

  it('should set photoUrl', () => {
    // Arrange
    const photoUrl: string = faker.internet.url();

    // Act & Assert
    user.photoUrl = photoUrl;
    expect(user.photoUrl).toBe(photoUrl);
  });
});
