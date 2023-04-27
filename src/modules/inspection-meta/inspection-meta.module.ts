import { Module } from '@nestjs/common';
import { InspectionMetaService } from './inspection-meta.service';
import { InspectionMetaController } from './inspection-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionMeta } from './entities/inspection-meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionMeta])],
  controllers: [InspectionMetaController],
  providers: [InspectionMetaService],
})
export class InspectionMetaModule {}
