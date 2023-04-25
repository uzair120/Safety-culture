import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { FetchTemplateItemCriteria } from './interfaces/fetch-template-item-criteria.interface';
import { TemplateItem } from './entities/template-item.entity';
import { CreateTemplateItemDto, UpdateTemplateItemDto } from './dto';
import { TemplateItemType } from './enums';

@Injectable()
export class TemplateItemService {
  private readonly logger = new Logger(TemplateItemService.name);

  constructor(
    @InjectRepository(TemplateItem)
    private readonly templateItemRepository: Repository<TemplateItem>,
  ) {}

  async create(createTemplateItemDto: CreateTemplateItemDto): Promise<ResponseDto> {
    this.logger.log(`Creating template item with title ${createTemplateItemDto.title}`);

    try {
      const data = await this.templateItemRepository.save(createTemplateItemDto);
      this.logger.log(`Template item with title ${createTemplateItemDto.title} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating template item with title ${createTemplateItemDto.title}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async createInternal(createTemplateItemDto: UpdateTemplateItemDto): Promise<TemplateItem> {
    this.logger.log(`Creating template item with title ${createTemplateItemDto.title}`);
    try {
      let data: any;

      if (createTemplateItemDto?.id) {
        const newRefinedTempalteItemDto = {
          id: createTemplateItemDto.id,
          title: createTemplateItemDto.title,
          type: createTemplateItemDto.type,
          templateId: createTemplateItemDto.templateId,
          orderIndex: createTemplateItemDto.orderIndex,
          parentId: createTemplateItemDto.parentId,
          status: createTemplateItemDto.status,
        };
        await this.templateItemRepository.update(newRefinedTempalteItemDto.id, newRefinedTempalteItemDto);
        data = await this.templateItemRepository.findOne({ where: { id: createTemplateItemDto.id } });
      } else {
        data = await this.templateItemRepository.save(createTemplateItemDto);
      }
      this.logger.log(`Template item with title ${createTemplateItemDto.title} created successfully`);
      return data;
    } catch (error) {
      this.logger.error(
        `Error occurred while creating template item with title ${createTemplateItemDto.title}`,
        error.stack,
      );
      return error;
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all template items`);

    try {
      const data = await this.templateItemRepository.find();
      this.logger.log(`Fetched all template items successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all template items`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching template item with id ${id}`);

    try {
      const data = await this.templateItemRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Template item with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Template item not found',
        });
      }

      this.logger.log(`Fetched template item with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching template item with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the template item',
        error: error.message,
      });
    }
  }

  async update(id: number, updateTemplateItemDto: UpdateTemplateItemDto): Promise<ResponseDto> {
    this.logger.log(`Updating template item with id ${id}`);

    try {
      const templateItem = await this.templateItemRepository.findOne({
        where: { id },
      });

      if (!templateItem) {
        this.logger.warn(`Template item with id ${id} not found`);
        return null;
      }

      await this.templateItemRepository.update(id, updateTemplateItemDto);
      const updatedTemplateItem = await this.templateItemRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated template item with id ${id} successfully`);
      return constructSuccessResponse(updatedTemplateItem);
    } catch (error) {
      this.logger.error(`Error occurred while updating template item with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }
  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting template item with id ${id}`);

    try {
      const templateItem = await this.templateItemRepository.findOne({
        where: { id },
      });

      if (templateItem) {
        await this.templateItemRepository.softDelete(id);
        this.logger.log(`Deleted template item with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Template item with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Template item not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting template item with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findByCriteria(criteria: FetchTemplateItemCriteria): Promise<ResponseDto> {
    this.logger.log(`Fetching template item with criteria ${criteria}`);

    try {
      const data = this.templateItemRepository.find({ where: criteria });

      if (!data) {
        this.logger.warn(`Template item with criteria ${criteria} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Template item not found',
        });
      }

      this.logger.log(`Fetched template item with criteria ${criteria} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching template item with criteria ${criteria}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the template item',
        error: error.message,
      });
    }
  }
}
