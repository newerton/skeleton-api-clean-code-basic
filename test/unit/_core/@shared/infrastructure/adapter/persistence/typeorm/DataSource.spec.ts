import { DataSource } from 'typeorm';

describe('TypeOrmCoreDirectory', () => {
  describe('__dirname', () => {
    test('Should return the default port 5432', async () => {
      process.env.DB_DIALECT = 'postgres';
      process.env.NODE_ENV = 'development';

      const { databaseConfig, dataSource } = await import(
        '@core/@shared/infrastructure/adapter/persistence/typeorm/DataSource'
      );

      expect(databaseConfig.type).toBe('postgres');
      expect(databaseConfig.port).toBe(5432);
      expect(databaseConfig.synchronize).toBeUndefined();
      expect(dataSource).toBeInstanceOf(DataSource);
    });
  });
});
