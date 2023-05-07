import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { ChoiceResponse } from './entities/multiple-choice-response.entity';
import { CreateChoiceResponseDto, UpdateChoiceResponseDto } from './dto';

@Injectable()
export class ChoiceResponseService {
  private readonly logger = new Logger(ChoiceResponseService.name);

  constructor(
    @InjectRepository(ChoiceResponse)
    private readonly choiceResponseRepository: Repository<ChoiceResponse>,
  ) {}

  async create(createChoiceResponseDto: CreateChoiceResponseDto): Promise<ResponseDto> {
    this.logger.log(`Creating responses name with question_id ${createChoiceResponseDto.questionId}`);

    try {
      const data = await this.choiceResponseRepository.save(createChoiceResponseDto);
      this.logger.log(`Responses name with question_id ${createChoiceResponseDto.questionId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating responses name with question_id ${createChoiceResponseDto.questionId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async createInternal(createChoiceResponseDto: UpdateChoiceResponseDto) {
    this.logger.log(`Creating responses name with question_id ${createChoiceResponseDto.questionId}`);

    try {
      let data = {};
      if (createChoiceResponseDto.id) {
        await this.choiceResponseRepository.update(createChoiceResponseDto.id, createChoiceResponseDto);
        data = await this.choiceResponseRepository.findOne({ where: { id: createChoiceResponseDto.id } });
      } else {
        data = await this.choiceResponseRepository.save(createChoiceResponseDto);
        this.logger.log(`Responses name with question_id ${createChoiceResponseDto.questionId} created successfully`);
      }
      return data;
    } catch (error) {
      this.logger.error(
        `Error occurred while creating responses name with question_id ${createChoiceResponseDto.questionId}`,
        error.stack,
      );
      return error;
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all responses names`);

    try {
      const data = await this.choiceResponseRepository.find();
      this.logger.log(`Fetched all responses names successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all responses names`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async getTemplateMCQs(templateId: number): Promise<ResponseDto> {
    this.logger.log(`Fetching all responses names`);

    try {
      let data = await this.choiceResponseRepository.find({ where: { isGlobal: true } });
      //deleting the ids of global responses as these are not for any change.
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.id) {
          delete element.id;
          delete element.createdAt;
          delete element.updatedAt;
          delete element.deletedAt;
          delete element.questionId;
          delete element.isGlobal;
        }
        if (element.options && element.options.length > 0) {
          element.options.map((v) => {
            delete v.id;
            delete v.createdAt;
            delete v.updatedAt;
            delete v.deletedAt;
            delete v.score;
            return v;
          });
        }
      }
      if (templateId) {
        const tempData = await this.choiceResponseRepository.find({ where: { templateId: templateId } });
        data = [...data, ...tempData];
      }
      this.logger.log(`Fetched all responses names successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all responses names`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching responses name with id ${id}`);
    try {
      const data = await this.choiceResponseRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Responses name with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Responses name not found',
        });
      }

      this.logger.log(`Fetched responses name with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching responses name with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the responses name',
        error: error.message,
      });
    }
  }
  async findOneByQuestionIdInternal(questionId: number) {
    this.logger.log(`Fetching responses name with questionId ${questionId}`);
    try {
      const data = await this.choiceResponseRepository.findOne({ where: { questionId: questionId } });

      this.logger.log(`Fetched responses name with questionId ${questionId} successfully`);
      return data;
    } catch (error) {
      this.logger.error(`Error occurred while fetching responses name with questionId ${questionId}`, error.stack);
      return {};
    }
  }
  async update(id: number, updateChoiceResponseDto: UpdateChoiceResponseDto): Promise<ResponseDto> {
    this.logger.log(`Updating responses name with id ${id}`);

    try {
      const choiceResponse = await this.choiceResponseRepository.findOne({
        where: { id },
      });

      if (!choiceResponse) {
        this.logger.warn(`Responses name with id ${id} not found`);
        return null;
      }

      await this.choiceResponseRepository.update(id, updateChoiceResponseDto);
      const updatedChoiceResponse = await this.choiceResponseRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated responses name with id ${id} successfully`);
      return constructSuccessResponse(updatedChoiceResponse);
    } catch (error) {
      this.logger.error(`Error occurred while updating responses name with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting responses name with id ${id}`);
    try {
      const choiceResponse = await this.choiceResponseRepository.findOne({ where: { id } });

      if (choiceResponse) {
        await this.choiceResponseRepository.softDelete(id);
        this.logger.log(`Deleted responses name with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Responses name with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Responses name not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting responses name with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }
}
