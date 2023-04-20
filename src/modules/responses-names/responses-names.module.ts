import { Module } from '@nestjs/common';
import { ResponsesNameService } from './responses-names.service';
import { ResponsesNameController } from './responses-names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesName } from './entities/responses-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsesName])],
  controllers: [ResponsesNameController],
  providers: [ResponsesNameService],
})
export class ResponsesNamesModule {}
