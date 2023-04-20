import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponsesNameService } from './responses-names.service';
import { CreateResponsesNameDto } from './dto/create-responses-name.dto';
import { UpdateResponsesNameDto } from './dto/update-responses-name.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_RESPONSES_NAME,
  GET_RESPONSES_NAME,
  PATCH_UPDATE_RESPONSES_NAME,
  POST_CREATE_RESPONSES_NAME,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('ResponsesName')
@Controller('responses-name')
export class ResponsesNameController {
  constructor(private readonly responsesNameService: ResponsesNameService) {}

  @SwaggerSuccessResponse(CreateResponsesNameDto, GET_RESPONSES_NAME)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.responsesNameService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateResponsesNameDto, POST_CREATE_RESPONSES_NAME)
  @Post()
  create(@Body() createResponsesNameDto: CreateResponsesNameDto): Promise<ResponseDto> {
    return this.responsesNameService.create(createResponsesNameDto);
  }

  @SwaggerSuccessResponse(UpdateResponsesNameDto, PATCH_UPDATE_RESPONSES_NAME)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateResponsesNameDto: UpdateResponsesNameDto): Promise<ResponseDto> {
    return this.responsesNameService.update(id, updateResponsesNameDto);
  }

  @SwaggerSuccessResponse({}, DELETE_RESPONSES_NAME)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.responsesNameService.delete(id);
  }
}
