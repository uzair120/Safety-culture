import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { Question } from './entities/question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { FetchQuestionCriteria } from './interfaces/fetch-question-criteria.interface';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<ResponseDto> {
    this.logger.log(`Creating question with item_id ${createQuestionDto.itemId}`);

    try {
      const data = await this.questionRepository.save(createQuestionDto);
      this.logger.log(`Question with item_id ${createQuestionDto.itemId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while creating question with item_id ${createQuestionDto.itemId}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all questions`);

    try {
      const data = await this.questionRepository.find();
      this.logger.log(`Fetched all questions successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all questions`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching question with id ${id}`);

    try {
      const data = await this.questionRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Question with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Question not found',
        });
      }

      this.logger.log(`Fetched question with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching question with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the question',
        error: error.message,
      });
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<ResponseDto> {
    this.logger.log(`Updating question with id ${id}`);

    try {
      const question = await this.questionRepository.findOne({
        where: { id },
      });

      if (!question) {
        this.logger.warn(`Question with id ${id} not found`);
        return null;
      }

      await this.questionRepository.update(id, updateQuestionDto);
      const updatedQuestion = await this.questionRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated question with id ${id} successfully`);
      return constructSuccessResponse(updatedQuestion);
    } catch (error) {
      this.logger.error(`Error occurred while updating question with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting question with id ${id}`);

    try {
      const question = await this.questionRepository.findOne({ where: { id } });

      if (question) {
        await this.questionRepository.softDelete(id);
        this.logger.log(`Deleted question with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Question with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Question not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting question with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findByCriteria(criteria: FetchQuestionCriteria): Promise<ResponseDto> {
    this.logger.log(`Fetching questions with criteria ${JSON.stringify(criteria)}`);

    try {
      this.questionRepository.find({ where: { id: 1 } });
      const data = await this.questionRepository.find({
        where: criteria,
        relations: ['item', 'widget'],
      });

      if (!data || data.length === 0) {
        this.logger.warn(`Questions with criteria ${JSON.stringify(criteria)} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Questions not found',
        });
      }

      this.logger.log(`Fetched questions with criteria ${JSON.stringify(criteria)} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching questions with criteria ${JSON.stringify(criteria)}`,
        error.stack,
      );
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the questions',
        error: error.message,
      });
    }
  }
}
