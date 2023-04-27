import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';

import {
  GET_ALL_ANSWERS,
  PATCH_UPDATE_ANSWER,
  POST_CREATE_ANSWER,
  DELETE_ANSWER,
  GET_ANSWER,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @SwaggerSuccessResponse(CreateAnswerDto, GET_ALL_ANSWERS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.answersService.findAll();
  }

  @SwaggerSuccessResponse(CreateAnswerDto, GET_ANSWER)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.answersService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateAnswerDto, POST_CREATE_ANSWER)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<ResponseDto> {
    return this.answersService.create(createAnswerDto);
  }

  @SwaggerSuccessResponse(UpdateAnswerDto, PATCH_UPDATE_ANSWER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto): Promise<ResponseDto> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @SwaggerSuccessResponse({}, DELETE_ANSWER)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.answersService.delete(id);
  }
}
