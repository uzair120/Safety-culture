import { CONSTANTS } from '../../app.constants';

export default (): any => ({
  env: process.env.NODE_ENV || CONSTANTS.ENVIRONMENT.DEVELOPMENT,
  port: process.env.APP_PORT || 3000,
  defaultLanguage: process.env.DEFAULT_LANGUAGE || CONSTANTS.LANGUAGE,
  corsWhitelist: process.env.CORS_WHITELIST,

  database: {
    hostReadReplica: process.env.DB_HOST_READ_REPLICA,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
