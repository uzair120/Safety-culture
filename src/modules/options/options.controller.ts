import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdateOptionsDto } from './dto/update-options.dto';
import { ResponseDto } from '../../common';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import {
  DELETE_Options,
  GET_ALL_OptionsS,
  GET_Options,
  GET_OptionsS_BY_QUESTION_ID,
  PATCH_UPDATE_Options,
  POST_CREATE_Options,
} from '../../swagger/SwaggerAPIDetails';

@SwaggerController('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @SwaggerSuccessResponse(CreateOptionsDto, GET_ALL_OptionsS)
  @Get()
  findAll(): Promise<ResponseDto> {
    return this.optionsService.findAll();
  }

  @SwaggerSuccessResponse(CreateOptionsDto, GET_Options)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ResponseDto> {
    return this.optionsService.findOne(id);
  }

  @SwaggerSuccessResponse(CreateOptionsDto, POST_CREATE_Options)
  @Post()
  create(@Body() createOptionsDto: CreateOptionsDto): Promise<ResponseDto> {
    return this.optionsService.create(createOptionsDto);
  }

  @SwaggerSuccessResponse(UpdateOptionsDto, PATCH_UPDATE_Options)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOptionsDto: UpdateOptionsDto): Promise<ResponseDto> {
    return this.optionsService.update(id, updateOptionsDto);
  }

  @SwaggerSuccessResponse({}, DELETE_Options)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<ResponseDto> {
    return this.optionsService.delete(id);
  }

  @SwaggerSuccessResponse(CreateOptionsDto, GET_OptionsS_BY_QUESTION_ID)
  @Get('multi_choice_response/:multiChoiceResponseId')
  findByQuestionId(@Param('multiChoiceResponseId') multiChoiceResponseId: number): Promise<ResponseDto> {
    return this.optionsService.findBtResponsesNameId(multiChoiceResponseId);
  }
}
