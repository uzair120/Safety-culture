// responses.service.ts
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { CreateResponseDto, UpdateResponseDto } from './dto';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<ResponseDto> {
    this.logger.log(`Creating response with responses_name_id ${createResponseDto.responsesNameId}`);

    try {
      const data = await this.responseRepository.save(createResponseDto);
      this.logger.log(`Response with responses_name_id ${createResponseDto.responsesNameId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating response with responses_name_id ${createResponseDto.responsesNameId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all responses`);

    try {
      const data = await this.responseRepository.find();
      this.logger.log(`Fetched all responses successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all responses`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching response with id ${id}`);

    try {
      const data = await this.responseRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Response with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Response not found',
        });
      }

      this.logger.log(`Fetched response with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching response with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the response',
        error: error.message,
      });
    }
  }

  async update(id: number, updateResponseDto: UpdateResponseDto): Promise<ResponseDto> {
    this.logger.log(`Updating response with id ${id}`);

    try {
      const response = await this.responseRepository.findOne({
        where: { id },
      });

      if (!response) {
        this.logger.warn(`Response with id ${id} not found`);
        return null;
      }

      await this.responseRepository.update(id, updateResponseDto);
      const updatedResponse = await this.responseRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated response with id ${id} successfully`);
      return constructSuccessResponse(updatedResponse);
    } catch (error) {
      this.logger.error(`Error occurred while updating response with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting response with id ${id}`);

    try {
      const response = await this.responseRepository.findOne({ where: { id } });

      if (response) {
        await this.responseRepository.softDelete(id);
        this.logger.log(`Deleted response with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Response with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Response not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting response with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }
}
