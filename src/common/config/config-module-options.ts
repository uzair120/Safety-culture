import appConfig from './app.config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import * as Joi from 'joi';
import { CONSTANTS } from '../../app.constants';
const nodeEnv = process.env.NODE_ENV;

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: nodeEnv ? `.env.${nodeEnv}` : '.env',
  load: [appConfig],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid(
        CONSTANTS.ENVIRONMENT.TEST,
        CONSTANTS.ENVIRONMENT.DEVELOPMENT,
        CONSTANTS.ENVIRONMENT.PRODUCTION,
      )
      .default(CONSTANTS.ENVIRONMENT.DEVELOPMENT),
    APP_PORT: Joi.number().required(),
    CORS_WHITELIST: Joi.string().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().optional(),
    DB_NAME: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  }),
};
