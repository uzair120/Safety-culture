import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { ResponsesName } from './entities/responses-name.entity';
import { CreateResponsesNameDto, UpdateResponsesNameDto } from './dto';

@Injectable()
export class ResponsesNameService {
  private readonly logger = new Logger(ResponsesNameService.name);

  constructor(
    @InjectRepository(ResponsesName)
    private readonly responsesNameRepository: Repository<ResponsesName>,
  ) {}

  async create(createResponsesNameDto: CreateResponsesNameDto): Promise<ResponseDto> {
    this.logger.log(`Creating responses name with question_id ${createResponsesNameDto.questionId}`);

    try {
      const data = await this.responsesNameRepository.save(createResponsesNameDto);
      this.logger.log(`Responses name with question_id ${createResponsesNameDto.questionId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating responses name with question_id ${createResponsesNameDto.questionId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all responses names`);

    try {
      const data = await this.responsesNameRepository.find();
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
      const data = await this.responsesNameRepository.findOne({ where: { id } });

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
  async update(id: number, updateResponsesNameDto: UpdateResponsesNameDto): Promise<ResponseDto> {
    this.logger.log(`Updating responses name with id ${id}`);

    try {
      const responsesName = await this.responsesNameRepository.findOne({
        where: { id },
      });

      if (!responsesName) {
        this.logger.warn(`Responses name with id ${id} not found`);
        return null;
      }

      await this.responsesNameRepository.update(id, updateResponsesNameDto);
      const updatedResponsesName = await this.responsesNameRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated responses name with id ${id} successfully`);
      return constructSuccessResponse(updatedResponsesName);
    } catch (error) {
      this.logger.error(`Error occurred while updating responses name with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting responses name with id ${id}`);
    try {
      const responsesName = await this.responsesNameRepository.findOne({ where: { id } });

      if (responsesName) {
        await this.responsesNameRepository.softDelete(id);
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
