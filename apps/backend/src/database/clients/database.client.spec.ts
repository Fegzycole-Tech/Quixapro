import { DatabaseClient } from './database.client';

describe('DatabaseClient', () => {
  let databaseClient: DatabaseClient;

  beforeEach(() => {
    databaseClient = new DatabaseClient();

    databaseClient.$connect = jest.fn().mockResolvedValue(undefined);
    databaseClient.$disconnect = jest.fn().mockResolvedValue(undefined);
  });

  it('should call $connect on onModuleInit', async () => {
    await databaseClient.onModuleInit();
    expect(databaseClient.$connect).toHaveBeenCalledTimes(1);
  });

  it('should call $disconnect on onModuleDestroy', async () => {
    await databaseClient.onModuleDestroy();
    expect(databaseClient.$disconnect).toHaveBeenCalledTimes(1);
  });
});
