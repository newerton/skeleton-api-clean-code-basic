import * as path from 'path';

import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const entityFolders = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  '**',
  'infrastructure',
  'adapter',
  'persistence',
  'typeorm',
);

const defaultConfig: DataSourceOptions = {
  type: process.env.DB_DIALECT as any,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: Boolean(process.env.DB_LOGGING),
  charset: 'utf8mb4_unicode_ci',
  entities: [`${entityFolders}/entities/**/*{.ts,.js}`],
  subscribers: [`${entityFolders}/subscribers/**/*{.ts,.js}`],
  migrations: [`${entityFolders}/migrations/**/*{.ts,.js}`],
};

const testConfig: DataSourceOptions = {
  ...defaultConfig,
  database: `${process.env.DB_DATABASE}_test`,
  logging: false,
  synchronize: true,
};

export const databaseConfig =
  process.env.NODE_ENV === 'test' ? testConfig : defaultConfig;

export const dataSource = new DataSource(databaseConfig);
