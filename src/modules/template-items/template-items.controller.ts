import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TemplateItemService } from './template-items.service';
import { CreateTemplateItemDto } from './dto/create-template-item.dto';
import { UpdateTemplateItemDto } from './dto/update-template-item.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_TEMPLATE_ITEM,
  GET_ALL_TEMPLATE_ITEMS,
  GET_TEMPLATE_ITEM,
  PATCH_UPDATE_TEMPLATE_ITEM,
  POST_CREATE_TEMPLATE_ITEM,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Template Items')
@Controller('template-items')
export class TemplateItemsController {
  constructor(private readonly templateItemsService: TemplateItemService) {}

  @SwaggerSuccessResponse(CreateTemplateItemDto, GET_ALL_TEMPLATE_ITEMS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.templateItemsService.findAll();
  }

  @SwaggerSuccessResponse(CreateTemplateItemDto, GET_TEMPLATE_ITEM)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.templateItemsService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateTemplateItemDto, POST_CREATE_TEMPLATE_ITEM)
  @Post()
  create(@Body() createTemplateItemDto: CreateTemplateItemDto): Promise<ResponseDto> {
    return this.templateItemsService.create(createTemplateItemDto);
  }

  @SwaggerSuccessResponse(UpdateTemplateItemDto, PATCH_UPDATE_TEMPLATE_ITEM)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTemplateItemDto: UpdateTemplateItemDto): Promise<ResponseDto> {
    return this.templateItemsService.update(id, updateTemplateItemDto);
  }

  @SwaggerSuccessResponse({}, DELETE_TEMPLATE_ITEM)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.templateItemsService.delete(id);
  }
}
