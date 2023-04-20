import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_QUESTION,
  GET_ALL_QUESTIONS,
  GET_QUESTION,
  PATCH_UPDATE_QUESTION,
  POST_CREATE_QUESTION,
} from '../../swagger/SwaggerAPIDetails';
import { FetchQuestionCriteria } from './interfaces/fetch-question-criteria.interface';

@SwaggerController('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @SwaggerSuccessResponse(CreateQuestionDto, GET_ALL_QUESTIONS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.questionService.findAll();
  }

  @SwaggerSuccessResponse(CreateQuestionDto, GET_QUESTION)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.questionService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateQuestionDto, POST_CREATE_QUESTION)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<ResponseDto> {
    return this.questionService.create(createQuestionDto);
  }

  @SwaggerSuccessResponse(UpdateQuestionDto, PATCH_UPDATE_QUESTION)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto): Promise<ResponseDto> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @SwaggerSuccessResponse({}, DELETE_QUESTION)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.questionService.delete(id);
  }

  @Get('criteria')
  findByCriteria(@Body() criteria: FetchQuestionCriteria): Promise<ResponseDto> {
    return this.questionService.findByCriteria(criteria);
  }
}
