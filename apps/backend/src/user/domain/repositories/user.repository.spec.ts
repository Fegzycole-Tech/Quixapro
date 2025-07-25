import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@nestjs/common';
import { User } from '../models/user.model';
import { User as UserEntity } from '@db/prisma';
import { UserRepository } from './user.repository';
import { convertNullToUndefined } from './helpers/convert-null-to-undefined.helper';
import { faker } from '@faker-js/faker';

describe('Repository: User ', () => {
  let userRepository: UserRepository;
  let user: User;
  let dbUser: UserEntity;
  let mockedLog: LoggerService;

  beforeEach(async () => {
    mockedLog = {
      log: jest.fn().mockImplementation(() => {}),
      error: jest.fn().mockImplementation(() => {}),
      warn: jest.fn().mockImplementation(() => {}),
      debug: jest.fn().mockImplementation(() => {}),
      verbose: jest.fn().mockImplementation(() => {}),
    };

    dbUser = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photoUrl: faker.internet.url(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    user = new User({
      ...dbUser,
      password: convertNullToUndefined(dbUser.password),
      photoUrl: convertNullToUndefined(dbUser.photoUrl),
    });

    const app: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    })
      .setLogger(mockedLog)
      .compile();

    userRepository = app.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    //Assert
    expect(userRepository).toBeDefined();
  });

  it('should save a user', async () => {
    userRepository.user.upsert = jest.fn().mockResolvedValue(dbUser);

    await userRepository.save(user);

    expect(userRepository.user.upsert).toHaveBeenCalledWith({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        photoUrl: user.photoUrl,
      },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        photoUrl: user.photoUrl,
      },
    });
  });

  it('should fail to save a user', async () => {
    const error: Error = new Error('Something went wrong');

    userRepository.user.upsert = jest.fn().mockRejectedValue(error);

    await expect(userRepository.save(user)).rejects.toThrow(error);

    expect(mockedLog.error).toHaveBeenCalled();
  });
});
