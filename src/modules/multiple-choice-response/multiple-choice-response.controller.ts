import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ChoiceResponseService } from './multiple-choice-response.service';
import { CreateChoiceResponseDto } from './dto/create-multiple-choice-response.dto';
import { UpdateChoiceResponseDto } from './dto/update-multiple-choice-response.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_RESPONSES_NAME,
  GET_RESPONSES_NAME,
  GET_TEMPLATE_RESPONSES_NAME,
  PATCH_UPDATE_RESPONSES_NAME,
  POST_CREATE_RESPONSES_NAME,
} from '../../swagger/SwaggerAPIDetails';
import { GetChoiceResponseByTemplateDto } from './dto';

@SwaggerController('ChoiceResponse')
@Controller('multi-choice-response')
export class ChoiceResponseController {
  constructor(private readonly choiceResponseService: ChoiceResponseService) {}

  @SwaggerSuccessResponse(CreateChoiceResponseDto, GET_RESPONSES_NAME)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.choiceResponseService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateChoiceResponseDto, POST_CREATE_RESPONSES_NAME)
  @Post()
  create(@Body() createChoiceResponseDto: CreateChoiceResponseDto): Promise<ResponseDto> {
    return this.choiceResponseService.create(createChoiceResponseDto);
  }

  @SwaggerSuccessResponse(UpdateChoiceResponseDto, PATCH_UPDATE_RESPONSES_NAME)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateChoiceResponseDto: UpdateChoiceResponseDto): Promise<ResponseDto> {
    return this.choiceResponseService.update(id, updateChoiceResponseDto);
  }

  @SwaggerSuccessResponse({}, DELETE_RESPONSES_NAME)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.choiceResponseService.delete(id);
  }

  @SwaggerSuccessResponse({}, GET_TEMPLATE_RESPONSES_NAME)
  @Get('template/:id?')
  templateMCQs(@Query() getChoiceResponseByTemplateDto: GetChoiceResponseByTemplateDto): Promise<ResponseDto> {
    return this.choiceResponseService.getTemplateMCQs(getChoiceResponseByTemplateDto.id);
  }
}
