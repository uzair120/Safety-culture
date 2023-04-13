import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
const envFile = nodeEnv ? `.env.${nodeEnv}` : '.env';
dotenv.config({ path: __dirname + '/' + envFile });

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
};
