import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync, configModuleOptions } from '../common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class DatabaseModule {}
