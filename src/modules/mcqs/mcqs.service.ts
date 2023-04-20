import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { MCQ } from './entities/mcq.entity';
import { CreateMCQDto, UpdateMCQDto } from './dto';

@Injectable()
export class MCQService {
  private readonly logger = new Logger(MCQService.name);

  constructor(
    @InjectRepository(MCQ)
    private readonly mcqRepository: Repository<MCQ>,
  ) {}

  async create(createMCQDto: CreateMCQDto): Promise<ResponseDto> {
    this.logger.log(`Creating MCQ with question_id ${createMCQDto.questionId}`);

    try {
      const data = await this.mcqRepository.save(createMCQDto);
      this.logger.log(`MCQ with question_id ${createMCQDto.questionId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while creating MCQ with question_id ${createMCQDto.questionId}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all MCQs`);

    try {
      const data = await this.mcqRepository.find();
      this.logger.log(`Fetched all MCQs successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all MCQs`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching MCQ with id ${id}`);

    try {
      const data = await this.mcqRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`MCQ with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'MCQ not found',
        });
      }

      this.logger.log(`Fetched MCQ with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching MCQ with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the MCQ',
        error: error.message,
      });
    }
  }

  async update(id: number, updateMCQDto: UpdateMCQDto): Promise<ResponseDto> {
    this.logger.log(`Updating MCQ with id ${id}`);

    try {
      const mcq = await this.mcqRepository.findOne({
        where: { id },
      });

      if (!mcq) {
        this.logger.warn(`MCQ with id ${id} not found`);
        return null;
      }

      await this.mcqRepository.update(id, updateMCQDto);
      const updatedMCQ = await this.mcqRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated MCQ with id ${id} successfully`);
      return constructSuccessResponse(updatedMCQ);
    } catch (error) {
      this.logger.error(`Error occurred while updating MCQ with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting MCQ with id ${id}`);

    try {
      const mcq = await this.mcqRepository.findOne({ where: { id } });

      if (mcq) {
        await this.mcqRepository.softDelete(id);
        this.logger.log(`Deleted MCQ with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`MCQ with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'MCQ not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting MCQ with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findByQuestionId(questionId: number): Promise<ResponseDto> {
    this.logger.log(`Fetching MCQs with question_id ${questionId}`);

    try {
      const data = await this.mcqRepository.find({
        where: { questionId },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`MCQs with question_id ${questionId} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'MCQs not found',
        });
      }

      this.logger.log(`Fetched MCQs with question_id ${questionId} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching MCQs with question_id ${questionId}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the MCQs',
        error: error.message,
      });
    }
  }
}
