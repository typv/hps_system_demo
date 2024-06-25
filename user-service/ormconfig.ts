import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
require('dotenv').config();

const dataSourceDefaultOptions = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  type: process.env.DB_CONNECTION as any || 'postgres',
  database: process.env.DB_DATABASE || '',
  schema: 'public',
  synchronize: false,
  poolSize: 10,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/src/entities/**/*.entity.{js,ts}'],
  migrations: ['dist/src/database/migrations/*.js'],
  subscribers: [__dirname + '/src/subscribers/**/*.subscribers.{js,ts}'],
  seeds: ['dist/src/database/seeders/*.js'],
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'src',
    migrationsDir: 'src/database/migrations',
  },
  timezone: 'utc',
  logging: process.env.DB_LOGGING === 'true' || false,
};

export const AppDataSource = new DataSource(dataSourceDefaultOptions);
export default dataSourceDefaultOptions;