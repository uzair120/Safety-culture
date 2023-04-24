import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Widget } from './entities/widget.entity';
import { CreateWidgetDto, UpdateWidgetDto } from './dto';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { WidgetSearchCriteria } from './interfaces/widget-search-criteria.interface';

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);

  constructor(
    @InjectRepository(Widget)
    private readonly widgetRepository: Repository<Widget>,
  ) {}

  async create(createWidgetDto: CreateWidgetDto): Promise<ResponseDto> {
    this.logger.log(`Creating widget with name ${createWidgetDto.name}`);

    try {
      const data = await this.widgetRepository.save(createWidgetDto);
      this.logger.log(`Widget with name ${createWidgetDto.name} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while creating widget with name ${createWidgetDto.name}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all widgets`);

    try {
      const data = await this.widgetRepository.find();
      this.logger.log(`Fetched all widgets successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all widgets`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching widget with id ${id}`);

    try {
      const data = await this.widgetRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Widget with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Widget not found',
        });
      }

      this.logger.log(`Fetched widget with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching widget with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the widget',
        error: error.message,
      });
    }
  }
  async findOneInternal(id: number) {
    this.logger.log(`Fetching widget with id ${id}`);

    return await this.widgetRepository.findOne({ where: { id } });
  }

  async update(id: number, updateWidgetDto: UpdateWidgetDto): Promise<ResponseDto> {
    this.logger.log(`Updating widget with id ${id}`);

    try {
      const widget = await this.widgetRepository.findOne({ where: { id } });

      if (!widget) {
        this.logger.warn(`Widget with id ${id} not found`);
        return null;
      }

      await this.widgetRepository.update(id, updateWidgetDto);
      const updatedWidget = await this.widgetRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated widget with id ${id} successfully`);
      return constructSuccessResponse(updatedWidget);
    } catch (error) {
      this.logger.error(`Error occurred while updating widget with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting widget with id ${id}`);

    try {
      const widget = await this.widgetRepository.findOne({ where: { id } });

      if (widget) {
        await this.widgetRepository.delete(id);
        this.logger.log(`Deleted widget with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Widget with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Widget not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting widget with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }
  async findByCriteria(criteria: WidgetSearchCriteria): Promise<Widget[]> {
    const queryBuilder = this.widgetRepository.createQueryBuilder('widget');

    if (criteria.name) {
      queryBuilder.andWhere('widget.name = :name', { name: criteria.name });
    }

    if (criteria.type) {
      queryBuilder.andWhere('widget.type = :type', { type: criteria.type });
    }

    if (criteria.disabled !== undefined) {
      queryBuilder.andWhere('widget.disabled = :disabled', {
        disabled: criteria.disabled,
      });
    }

    const widgets = await queryBuilder.getMany();

    return widgets;
  }
}
