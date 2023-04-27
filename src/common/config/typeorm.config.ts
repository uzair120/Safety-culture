import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { GlobalSubscribers } from 'subscribers/global.subscriber';
import { CONSTANTS } from '../../app.constants';
import DatabaseLogger from '../../databaseLogger';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    const isDevelopmentEnv = configService.get('env') === 'development';
    const nodeEnv = process.env.NODE_ENV;

    return {
      type: 'postgres',
      logger: new DatabaseLogger(),

      //Shifting read query to read replica
      replication: {
        master: {
          host: configService.get('database.host'),
          port: configService.get<number | undefined>('database.port'),
          database: configService.get('database.name'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
        },
        slaves: [
          {
            host: configService.get('database.hostReadReplica'),
            port: configService.get<number | undefined>('database.port'),
            database: configService.get('database.name'),
            username: configService.get('database.username'),
            password: configService.get('database.password'),
          },
        ],
      },
      migrations: [__dirname + '/../../**/migrations/*{.ts,.js}'],
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: isDevelopmentEnv,
      migrationsRun: true,
      // keepConnectionAlive: isDevelopmentEnv,
      // namingStrategy: new TypeOrmNamingStrategy(),

      // subscribers: [...GlobalSubscribers],
      // Timezone configured on the MySQL server. This is used to typecast server date/time values to JavaScript Date object and vice versa.
      keepConnectionAlive: nodeEnv == CONSTANTS.ENVIRONMENT.TEST ? true : false,
      // debug: isDevelopmentEnv,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
};
