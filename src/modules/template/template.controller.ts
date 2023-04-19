import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_TEMPLATE,
  GET_ALL_TEMPLATES,
  GET_TEMPLATE,
  PATCH_UPDATE_TEMPLATE,
  POST_CREATE_TEMPLATE,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Template')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @SwaggerSuccessResponse(CreateTemplateDto, GET_ALL_TEMPLATES)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.templateService.findAll();
  }

  @SwaggerSuccessResponse(CreateTemplateDto, GET_TEMPLATE)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.templateService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateTemplateDto, POST_CREATE_TEMPLATE)
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto): Promise<ResponseDto> {
    return this.templateService.create(createTemplateDto);
  }

  @SwaggerSuccessResponse(UpdateTemplateDto, PATCH_UPDATE_TEMPLATE)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTemplateDto: UpdateTemplateDto): Promise<ResponseDto> {
    return this.templateService.update(id, updateTemplateDto);
  }

  @SwaggerSuccessResponse({}, DELETE_TEMPLATE)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.templateService.delete(id);
  }
}
