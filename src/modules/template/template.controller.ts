import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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
import { GetAllTemplates } from './dto/get-all-templates.dto';

@SwaggerController('Template')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @SwaggerSuccessResponse(GetAllTemplates, GET_ALL_TEMPLATES)
  @Get()
  findAll(@Query('page') pagination: GetAllTemplates = { page: 1, limit: 10 }): Promise<ResponseDto> {
    const { page = 1, limit = 10 } = pagination;
    return this.templateService.findAll(Number(page), Number(limit));
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
