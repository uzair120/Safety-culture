import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseDto } from '../../common';
import { WidgetService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_WIDGET,
  GET_ALL_WIDGETS,
  GET_WIDGET,
  PATCH_UPDATE_WIDGET,
  POST_CREATE_WIDGET,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Widgets')
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetService) {}

  @SwaggerSuccessResponse(CreateWidgetDto, GET_ALL_WIDGETS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.widgetsService.findAll();
  }

  @SwaggerSuccessResponse(CreateWidgetDto, GET_WIDGET)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.widgetsService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateWidgetDto, POST_CREATE_WIDGET)
  @Post()
  create(@Body() createWidgetDto: CreateWidgetDto): Promise<ResponseDto> {
    return this.widgetsService.create(createWidgetDto);
  }

  @SwaggerSuccessResponse(UpdateWidgetDto, PATCH_UPDATE_WIDGET)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWidgetDto: UpdateWidgetDto): Promise<ResponseDto> {
    return this.widgetsService.update(id, updateWidgetDto);
  }

  @SwaggerSuccessResponse({}, DELETE_WIDGET)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.widgetsService.delete(id);
  }
}
