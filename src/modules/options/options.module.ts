import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Options } from './entities/options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Options])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
