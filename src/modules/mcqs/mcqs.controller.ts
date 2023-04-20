import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MCQService } from './mcqs.service';
import { CreateMCQDto } from './dto/create-mcq.dto';
import { UpdateMCQDto } from './dto/update-mcq.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_MCQ,
  GET_ALL_MCQS,
  GET_MCQ,
  GET_MCQS_BY_QUESTION_ID,
  PATCH_UPDATE_MCQ,
  POST_CREATE_MCQ,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('MCQs')
@Controller('mcqs')
export class MCQController {
  constructor(private readonly mcqService: MCQService) {}

  @SwaggerSuccessResponse(CreateMCQDto, GET_ALL_MCQS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.mcqService.findAll();
  }

  @SwaggerSuccessResponse(CreateMCQDto, GET_MCQ)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.mcqService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateMCQDto, POST_CREATE_MCQ)
  @Post()
  create(@Body() createMCQDto: CreateMCQDto): Promise<ResponseDto> {
    return this.mcqService.create(createMCQDto);
  }

  @SwaggerSuccessResponse(UpdateMCQDto, PATCH_UPDATE_MCQ)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMCQDto: UpdateMCQDto): Promise<ResponseDto> {
    return this.mcqService.update(id, updateMCQDto);
  }

  @SwaggerSuccessResponse({}, DELETE_MCQ)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.mcqService.delete(id);
  }

  @SwaggerSuccessResponse(CreateMCQDto, GET_MCQS_BY_QUESTION_ID)
  @Get('question/:questionId')
  findByQuestionId(@Param('questionId') questionId: number): Promise<ResponseDto> {
    return this.mcqService.findByQuestionId(questionId);
  }
}
