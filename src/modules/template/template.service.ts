import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';
import {
  constructSuccessResponse,
  constructErrorResponse,
  ResponseDto,
} from '../../common';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<ResponseDto> {
    this.logger.log(`Creating template with title ${createTemplateDto.title}`);

    try {
      const data = await this.templateRepository.save(createTemplateDto);
      this.logger.log(
        `Template with title ${createTemplateDto.title} created successfully`,
      );
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating template with title ${createTemplateDto.title}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all templates`);

    try {
      const data = await this.templateRepository.find();
      this.logger.log(`Fetched all templates successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching all templates`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching template with id ${id}`);

    try {
      const data = await this.templateRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Template with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Template not found',
        });
      }

      this.logger.log(`Fetched template with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching template with id ${id}`,
        error.stack,
      );
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the template',
        error: error.message,
      });
    }
  }

  async update(
    id: number,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<ResponseDto> {
    this.logger.log(`Updating template with id ${id}`);

    try {
      const template = await this.templateRepository.findOne({ where: { id } });

      if (!template) {
        this.logger.warn(`Template with id ${id} not found`);
        return null;
      }

      await this.templateRepository.update(id, updateTemplateDto);
      const updatedTemplate = await this.templateRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated template with id ${id} successfully`);
      return constructSuccessResponse(updatedTemplate);
    } catch (error) {
      this.logger.error(
        `Error occurred while updating template with id ${id}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting template with id ${id}`);

    try {
      const template = await this.templateRepository.findOne({ where: { id } });

      if (template) {
        await this.templateRepository.delete(id);
        this.logger.log(`Deleted template with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Template with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Template not found',
      });
    } catch (error) {
      this.logger.error(
        `Error occurred while deleting template with id ${id}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }
}
