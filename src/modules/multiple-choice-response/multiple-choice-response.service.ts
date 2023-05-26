import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { ChoiceResponse } from './entities/multiple-choice-response.entity';
import { CreateChoiceResponseDto, UpdateChoiceResponseDto } from './dto';
import { OptionsService } from '../options/options.service';
import { FetchMultiChoiceCriteria } from './interfaces';
import { defaultMultiChoiceOptions } from './constants';

@Injectable()
export class ChoiceResponseService {
  private readonly logger = new Logger(ChoiceResponseService.name);

  constructor(
    private readonly optionsService: OptionsService,
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
      throw Error(
        `Error occurred while creating responses name with question_id ${createChoiceResponseDto.questionId}`,
      );
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
  async findOneByQuestionIdInternal(multiChoiceId: number) {
    this.logger.log(`Fetching responses name with questionId ${multiChoiceId}`);
    try {
      const data = await this.choiceResponseRepository.findOne({ where: { id: multiChoiceId } });

      this.logger.log(`Fetched responses name with questionId ${multiChoiceId} successfully`);
      return data;
    } catch (error) {
      this.logger.error(`Error occurred while fetching responses name with questionId ${multiChoiceId}`, error.stack);
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

  async createMultiChoiceResponse(mcqData: any): Promise<ResponseDto> {
    try {
      this.logger.log(`Creating multi choice response with body ${mcqData}`);
      const multiChoiceData: any = await this.createInternal({
        name: mcqData?.name ? mcqData.name : 'MCQs',
        ...(!mcqData.isGlobal ? { templateId: mcqData.templateId } : {}),
        isGlobal: mcqData.isGlobal,
        ...(mcqData.id ? { id: mcqData.id } : {}),
      });
      multiChoiceData.options = [];
      for (let index = 0; index < mcqData.options.length; index++) {
        const element = mcqData.options[index];
        const option = await this.optionsService.createInternal({
          ...element,
          multiChoiceResponseId: multiChoiceData.id,
        });
        multiChoiceData.options.push(option);
      }
      return constructSuccessResponse(multiChoiceData);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async getMultiChoiceResponses(criteria: FetchMultiChoiceCriteria) {
    try {
      this.logger.log(`Fetching multi choice responses with criteria ${criteria}`);
      const responses = await this.choiceResponseRepository
        .createQueryBuilder('multi_choice_response')
        .leftJoinAndSelect('multi_choice_response.options', 'option')
        .where(criteria)
        .orderBy({
          'multi_choice_response.id': 'ASC',
          'option.id': 'ASC',
        })
        .getMany();

      return constructSuccessResponse(responses);
    } catch (error) {
      this.logger.error(`Error occurred while fetching responses with criteria ${criteria}`, error.stack);
    }
  }

  async createDefaultMultiChoiceResponses(templateId: number) {
    try {
      this.logger.log(`Creating default multi choice responses with for template id: ${templateId}`);
      defaultMultiChoiceOptions.forEach(async (optionSet) => {
        const response: any = await this.createInternal({ templateId, isGlobal: false });
        optionSet.forEach(async (option: any) => {
          await this.optionsService.create({ ...option, multiChoiceResponseId: response.id });
        });
      });
      this.logger.log(`Created default multi choice responses with for template id: ${templateId}`);
    } catch (error) {
      this.logger.log(`Failed creating default multi choice responses with for template id: ${templateId}`);
      return error.message;
    }
  }
}
