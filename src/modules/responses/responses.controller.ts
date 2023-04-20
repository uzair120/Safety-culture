// responses.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  POST_CREATE_RESPONSE,
  PATCH_UPDATE_RESPONSE,
  DELETE_RESPONSE,
  GET_RESPONSE,
  GET_ALL_RESPONSES,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Responses')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @SwaggerSuccessResponse(CreateResponseDto, GET_ALL_RESPONSES)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.responsesService.findAll();
  }

  @SwaggerSuccessResponse(CreateResponseDto, GET_RESPONSE)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.responsesService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateResponseDto, POST_CREATE_RESPONSE)
  @Post()
  create(@Body() createResponseDto: CreateResponseDto): Promise<ResponseDto> {
    return this.responsesService.create(createResponseDto);
  }

  @SwaggerSuccessResponse(UpdateResponseDto, PATCH_UPDATE_RESPONSE)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateResponseDto: UpdateResponseDto): Promise<ResponseDto> {
    return this.responsesService.update(id, updateResponseDto);
  }

  @SwaggerSuccessResponse({}, DELETE_RESPONSE)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.responsesService.delete(id);
  }
}
