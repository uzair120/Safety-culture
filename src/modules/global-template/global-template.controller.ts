import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalTemplateService } from './global-template.service';
import { CreateGlobalTemplateDto } from './dto/create-global-template.dto';
import { UpdateGlobalTemplateDto } from './dto/update-global-template.dto';
import { SwaggerController, SwaggerSuccessResponse } from '../../swagger/decorators';
import { POST_CREATE_GLOBAL_TEMP, GET_ALL_GLOBAL_TEMP } from '../../swagger/SwaggerAPIDetails';
import { ApiBody } from '@nestjs/swagger';

@SwaggerController('Global-template')
@Controller('global-template')
export class GlobalTemplateController {
  constructor(private readonly globalTemplateService: GlobalTemplateService) {}

  // @SwaggerSuccessResponse(CreateGlobalTemplateDto, POST_CREATE_GLOBAL_TEMP)
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       template: {
  //         type: 'object',
  //       },
  //     },
  //   },
  // })
  @ApiBody({ type: [CreateGlobalTemplateDto] })
  @Post()
  create(@Body() createGlobalTemplateDto: CreateGlobalTemplateDto) {
    return this.globalTemplateService.create(createGlobalTemplateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalTemplateDto: UpdateGlobalTemplateDto) {
    return this.globalTemplateService.update(+id, updateGlobalTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalTemplateService.remove(+id);
  }
}
