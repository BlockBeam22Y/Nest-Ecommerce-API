import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { db } from './envs';

const dbConfig = {
  type: 'postgres',
  database: db.database,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  // dropSchema: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => dbConfig);

export const AppDataSource = new DataSource(dbConfig as DataSourceOptions);
