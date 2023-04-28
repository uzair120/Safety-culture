import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InspectionMetaService } from './inspection-meta.service';
import { CreateInspectionMetaDto } from './dto/create-inspection-meta.dto';
import { UpdateInspectionMetaDto } from './dto/update-inspection-meta.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  GET_ALL_INSPECTION_METAS,
  GET_INSPECTION_META,
  POST_CREATE_INSPECTION_META,
  PATCH_UPDATE_INSPECTION_META,
  DELETE_INSPECTION_META,
} from '../../swagger/SwaggerAPIDetails';
import { FetchInspectionCriteria } from './interfaces/fetchInspectionCriteria';

@SwaggerController('InspectionMeta')
@Controller('inspection-meta')
export class InspectionMetaController {
  constructor(private readonly inspectionMetaService: InspectionMetaService) {}

  // @SwaggerSuccessResponse(CreateInspectionMetaDto, GET_ALL_INSPECTION_METAS)
  // @Get()
  // findAll(): Promise<ResponseDto> {
  //   return this.inspectionMetaService.findAll();
  // }

  @SwaggerSuccessResponse(CreateInspectionMetaDto, GET_INSPECTION_META)
  @Get()
  findOne(@Query() criteria: FetchInspectionCriteria): Promise<ResponseDto> {
    console.log('HERE');

    return this.inspectionMetaService.findByCriteria(criteria);
  }

  @SwaggerSuccessResponse(CreateInspectionMetaDto, POST_CREATE_INSPECTION_META)
  @Post()
  create(@Body() createInspectionMetaDto: CreateInspectionMetaDto): Promise<ResponseDto> {
    return this.inspectionMetaService.create(createInspectionMetaDto);
  }

  @SwaggerSuccessResponse(UpdateInspectionMetaDto, PATCH_UPDATE_INSPECTION_META)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInspectionMetaDto: UpdateInspectionMetaDto): Promise<ResponseDto> {
    return this.inspectionMetaService.update(id, updateInspectionMetaDto);
  }

  @SwaggerSuccessResponse({}, DELETE_INSPECTION_META)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.inspectionMetaService.delete(id);
  }
}
