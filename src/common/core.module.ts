import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import * as path from 'path';
// import { GlobalExceptionFilter } from './filters';
import { LoggingInterceptor } from './interceptors';
import { RequestContext } from './services';
import { DatabaseModule } from '../database/database.module';
import { CONSTANTS } from '../app.constants';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [DatabaseModule, HttpModule],

  providers: [
    Logger,
    RequestContext,
    // ErrorService,
    // SlackBotService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],

  exports: [RequestContext, Logger],
})
export class CoreModule {}
