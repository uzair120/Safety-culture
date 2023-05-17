import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { WidgetValue } from './entities/widget_value.entity';
import { CreateWidgetValueDto, UpdateWidgetValueDto } from './dto';
import { FetchWidgetValueCriteria } from './interfaces/fetch-widget-value-criteria.interface';

@Injectable()
export class WidgetValuesService {
  private readonly logger = new Logger(WidgetValuesService.name);

  constructor(
    @InjectRepository(WidgetValue)
    private readonly widgetValuesRepository: Repository<WidgetValue>,
  ) {}

  async create(createWidgetValueDto: CreateWidgetValueDto): Promise<ResponseDto> {
    this.logger.log(
      `Creating widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId}`,
    );

    try {
      await this.widgetValuesRepository.query(`
      SELECT insert_widget_value(${createWidgetValueDto.questionId}, '${createWidgetValueDto.attributeName}', '${createWidgetValueDto.attributeValue}')
    `);
      const data = await this.widgetValuesRepository.findOne({
        where: { questionId: createWidgetValueDto.questionId, attributeName: createWidgetValueDto.attributeName },
      });

      this.logger.log(
        `Widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId} created successfully`,
      );
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async createInternal(createWidgetValueDto: UpdateWidgetValueDto) {
    this.logger.log(
      `Creating widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId}`,
    );

    try {
      await this.widgetValuesRepository.query(`
      SELECT insert_widget_value(${createWidgetValueDto.questionId}, '${createWidgetValueDto.attributeName}', '${createWidgetValueDto.attributeValue}')
    `);
      const data = await this.widgetValuesRepository.findOne({
        where: { questionId: createWidgetValueDto.questionId, attributeName: createWidgetValueDto.attributeName },
      });
      this.logger.log(
        `Widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId} created successfully`,
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Error occurred while creating widget value with attribute name ${createWidgetValueDto.attributeName} for question with id ${createWidgetValueDto.questionId}`,
        error.stack,
      );
      throw Error(error.message);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all widget values`);

    try {
      const data = await this.widgetValuesRepository.find();
      this.logger.log(`Fetched all widget values successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all widget values`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(questionId: number, attributeName: string): Promise<ResponseDto> {
    this.logger.log(`Fetching widget value with question id ${questionId} and attribute name ${attributeName}`);

    try {
      const data = await this.widgetValuesRepository.findOne({
        where: { questionId, attributeName },
      });

      if (!data) {
        this.logger.warn(`Widget value with question id ${questionId} and attribute name ${attributeName} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Widget value not found',
        });
      }

      this.logger.log(
        `Fetched widget value with question id ${questionId} and attribute name ${attributeName} successfully`,
      );
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching widget value with question id ${questionId} and attribute name ${attributeName}`,
        error.stack,
      );
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the widget value',
        error: error.message,
      });
    }
  }

  async update(
    questionId: number,
    attributeName: string,
    updateWidgetValueDto: UpdateWidgetValueDto,
  ): Promise<ResponseDto> {
    this.logger.log(`Updating widget value with question id ${questionId} and attribute name ${attributeName}`);

    try {
      const widgetValue = await this.widgetValuesRepository.findOne({
        where: { questionId, attributeName },
      });

      if (!widgetValue) {
        this.logger.warn(`Widget value with question id ${questionId} and attribute name ${attributeName} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Widget value not found',
        });
      }

      await this.widgetValuesRepository.query(`
      SELECT insert_widget_value(${questionId}, '${attributeName}', '${updateWidgetValueDto.attributeValue}')
    `);
      const updatedWidgetValue = await this.widgetValuesRepository.findOne({
        where: { questionId: questionId, attributeName: attributeName },
      });

      this.logger.log(
        `Updated widget value with question id ${questionId} and attribute name ${attributeName} successfully`,
      );
      return constructSuccessResponse(updatedWidgetValue);
    } catch (error) {
      this.logger.error(
        `Error occurred while updating widget value with question id ${questionId} and attribute name ${attributeName}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async delete(questionId: number, attributeName: string): Promise<ResponseDto> {
    this.logger.log(`Deleting widget value with questionId ${questionId} and attributeName ${attributeName}`);

    try {
      const widgetValue = await this.widgetValuesRepository.findOne({
        where: { questionId, attributeName },
      });

      if (!widgetValue) {
        this.logger.warn(`Widget value with questionId ${questionId} and attributeName ${attributeName} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Widget value not found',
        });
      }

      await this.widgetValuesRepository.softDelete({ questionId, attributeName });
      this.logger.log(
        `Deleted widget value with questionId ${questionId} and attributeName ${attributeName} successfully`,
      );
      return constructSuccessResponse(true);
    } catch (error) {
      this.logger.error(
        `Error occurred while deleting widget value with questionId ${questionId} and attributeName ${attributeName}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }
  async fetchByCriteria(criteria: FetchWidgetValueCriteria): Promise<ResponseDto> {
    this.logger.log(`Fetching widget values with criteria ${JSON.stringify(criteria)}`);

    try {
      const widgetValues = await this.widgetValuesRepository.find({
        where: criteria,
      });

      if (!widgetValues.length) {
        this.logger.warn(`No widget values found with criteria ${JSON.stringify(criteria)}`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'No widget values found',
        });
      }

      this.logger.log(`Fetched ${widgetValues.length} widget values with criteria ${JSON.stringify(criteria)}`);
      return constructSuccessResponse(widgetValues);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching widget values with criteria ${JSON.stringify(criteria)}`,
        error.stack,
      );
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching widget values',
        error: error.message,
      });
    }
  }

  async fetchByCriteriaInternal(criteria: FetchWidgetValueCriteria) {
    this.logger.log(`Fetching widget values with criteria ${JSON.stringify(criteria)}`);

    try {
      const widgetValues = await this.widgetValuesRepository.find({
        where: criteria,
      });

      this.logger.log(`Fetched ${widgetValues.length} widget values with criteria ${JSON.stringify(criteria)}`);
      return widgetValues;
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching widget values with criteria ${JSON.stringify(criteria)}`,
        error.stack,
      );
      return [];
    }
  }

  async deleteByCriteria(criteria: FetchWidgetValueCriteria) {
    this.logger.log(`Deleting widget value with criteria: ${criteria} }`);
    try {
      await this.widgetValuesRepository.delete(criteria);
      this.logger.log(`Deleted widget value with criteria ${criteria} `);
      return true;
    } catch (error) {
      this.logger.error(`Error occurred while deleting widget values with criteria ${criteria} `, error.stack);
      return error;
    }
  }
}
