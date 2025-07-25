import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateUser } from './interfaces/user.interface';
import { LoggerService } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserFactory } from './user.factory';
import { faker } from '@faker-js/faker';

describe('Factory: User', () => {
  let factory: UserFactory;
  let mockedLog: LoggerService;

  beforeEach(async () => {
    mockedLog = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [UserFactory],
    })
      .setLogger(mockedLog)
      .compile();
    factory = app.get<UserFactory>(UserFactory);
  });

  it('should create a User', () => {
    const userData: CreateUser = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photoUrl: faker.internet.url(),
    };

    // Arrange
    const user: User = factory.create({
      ...userData,
    });

    // Assert
    expect(user.id).toEqual(userData.id);
    expect(user.firstName).toEqual(userData.firstName);
    expect(user.lastName).toEqual(userData.lastName);
    expect(user.email).toEqual(userData.email);
    expect(user.password).toEqual(userData.password);
    expect(user.photoUrl).toEqual(userData.photoUrl);
  });
});
