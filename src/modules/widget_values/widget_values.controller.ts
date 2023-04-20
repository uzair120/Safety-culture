import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WidgetValuesService } from './widget_values.service';
import { CreateWidgetValueDto, UpdateWidgetValueDto } from './dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_WIDGET_VALUE,
  GET_ALL_WIDGET_VALUES,
  GET_WIDGET_VALUE,
  POST_CREATE_WIDGET_VALUE,
  PUT_UPDATE_WIDGET_VALUE,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Widget Values')
@Controller('widget-values')
export class WidgetValuesController {
  constructor(private readonly widgetValuesService: WidgetValuesService) {}

  @SwaggerSuccessResponse(CreateWidgetValueDto, GET_ALL_WIDGET_VALUES)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.widgetValuesService.findAll();
  }

  @SwaggerSuccessResponse(CreateWidgetValueDto, GET_WIDGET_VALUE)
  @Get(':questionId/:attributeName')
  findOne(
    @Param('questionId') questionId: number,
    @Param('attributeName') attributeName: string,
  ): Promise<ResponseDto> {
    return this.widgetValuesService.findOne(questionId, attributeName);
  }

  @SwaggerSuccessResponse(CreateWidgetValueDto, POST_CREATE_WIDGET_VALUE)
  @Post()
  create(@Body() createWidgetValueDto: CreateWidgetValueDto): Promise<ResponseDto> {
    return this.widgetValuesService.create(createWidgetValueDto);
  }

  @SwaggerSuccessResponse(UpdateWidgetValueDto, PUT_UPDATE_WIDGET_VALUE)
  @Put(':questionId/:attributeName')
  update(
    @Param('questionId') questionId: number,
    @Param('attributeName') attributeName: string,
    @Body() updateWidgetValueDto: UpdateWidgetValueDto,
  ): Promise<ResponseDto> {
    return this.widgetValuesService.update(questionId, attributeName, updateWidgetValueDto);
  }

  @SwaggerSuccessResponse({}, DELETE_WIDGET_VALUE)
  @Delete(':questionId/:attributeName')
  delete(@Param('questionId') questionId: number, @Param('attributeName') attributeName: string): Promise<ResponseDto> {
    return this.widgetValuesService.delete(questionId, attributeName);
  }
}
