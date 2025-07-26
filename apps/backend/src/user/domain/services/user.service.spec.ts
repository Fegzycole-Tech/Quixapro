import { Test, TestingModule } from '@nestjs/testing';
import { GetUserFailureException } from '../exceptions/get-user-failure.exception';
import { LoggerService } from '@nestjs/common';
import { User } from '../models/user.model';
import { UserCreationFailureException } from '../exceptions/user-creation-failure.exception';
import { UserFactory } from '../factories/user.factory';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';
import { faker } from '@faker-js/faker';

describe('User Service:', () => {
  let service: UserService;
  let repository: UserRepository;
  let factory: UserFactory;
  let user: User;
  let mockedLog: LoggerService;

  beforeEach(async () => {
    mockedLog = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    user = new User({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photoUrl: faker.internet.url(),
    });

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    })
      .setLogger(mockedLog)
      .compile();

    service = app.get<UserService>(UserService);
    repository = app.get<UserRepository>(UserRepository);
    factory = app.get<UserFactory>(UserFactory);
  });

    it('should save a user', async () => {
      repository.save = jest.fn().mockResolvedValue(user);
      factory.create = jest.fn().mockReturnValue(user);

      const result: User = await service.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        photoUrl: user.photoUrl,
      });

      expect(factory.create).toHaveBeenCalledWith({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        photoUrl: user.photoUrl,
      });
      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('should throw UserCreationFailureException', async () => {
      repository.save = jest.fn().mockRejectedValue(new Error());

      await expect(
        service.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          photoUrl: user.photoUrl,
        }),
      ).rejects.toThrow(UserCreationFailureException);
    });

    it('should find a user', async () => {
      repository.findOne = jest.fn().mockResolvedValue(user);

      const foundUser: User = await service.get({
        id: user.id,
        email: user.email,
      });

      expect(repository.findOne).toHaveBeenCalledWith({ id: user.id, email: user.email });
      expect(foundUser).toEqual(user);
    });

    it('should throw GetUserFailureException', async () => {
      repository.findOne = jest.fn().mockRejectedValue(new Error());

      await expect(
        service.get({
          id: user.id,
          email: user.email,
        }),
      ).rejects.toThrow(GetUserFailureException);
    });

  it('should throw UserNotFoundException', async () => {
    repository.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      service.get({
        id: user.id,
        email: user.email,
      }),
    ).rejects.toThrow(UserNotFoundException);
  });
});
