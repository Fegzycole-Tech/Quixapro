import { OnModuleInit } from '@nestjs/common';

export class DatabaseClient implements OnModuleInit {
  onModuleInit(): Promise<void> {
    return this.$connect();
  }

  onModuleDestroy(): Promise<void> {
    return this.$disconnect();
  }

  async $connect(): Promise<void> {}
  async $disconnect(): Promise<void> {}

  $transaction: () => jest.Mock = () => jest.fn();
  $queryRaw: () => jest.Mock = () => jest.fn();

  // List of Prisma methods
  private prismaMethods: { [key: string]: () => jest.Mock } = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    findFirstOrThrow: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    upsert: jest.fn(),
    count: jest.fn(),
    deleteMany: jest.fn(),
    groupBy: jest.fn(),
    $transaction: jest.fn(),
  };
}
