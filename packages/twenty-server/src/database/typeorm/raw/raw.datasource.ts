import { config } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  override: true,
});

const pgDatabaseUrl = process.env.PG_DATABASE_URL || process.env.DATABASE_URL;
const isProd = process.env.NODE_ENV === 'production';

const typeORMRawModuleOptions: DataSourceOptions = {
  url: pgDatabaseUrl,
  type: 'postgres',
  logging: ['error'],
  ssl:
    isProd || process.env.PG_SSL_ALLOW_SELF_SIGNED === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
};

export const rawDataSource = new DataSource(typeORMRawModuleOptions);
