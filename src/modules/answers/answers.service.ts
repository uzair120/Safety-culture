import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';

@Injectable()
export class AnswersService {
  private readonly logger = new Logger(AnswersService.name);

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<ResponseDto> {
    this.logger.log(`Creating answer with question_id ${createAnswerDto.questionId}`);

    try {
      const data = await this.answerRepository.save(createAnswerDto);
      this.logger.log(`Answer with question_id ${createAnswerDto.questionId} created successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating answer with question_id ${createAnswerDto.questionId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all answers`);

    try {
      const data = await this.answerRepository.find();
      this.logger.log(`Fetched all answers successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all answers`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching answer with id ${id}`);

    try {
      const data = await this.answerRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Answer with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Answer not found',
        });
      }

      this.logger.log(`Fetched answer with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching answer with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the answer',
        error: error.message,
      });
    }
  }

  async findByMetaId(inspectionMetaId: number) {
    this.logger.log(`Fetching answer with inspectionMetaId ${inspectionMetaId}`);

    try {
      const data = await this.answerRepository.findOne({ where: { inspectionMetaId } });

      this.logger.log(`Fetched answer with inspectionMetaId ${inspectionMetaId} successfully`);
      return data;
    } catch (error) {
      this.logger.error(`Error occurred while fetching answer with inspectionMetaId ${inspectionMetaId}`, error.stack);
      return null;
    }
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<ResponseDto> {
    this.logger.log(`Updating answer with id ${id}`);

    try {
      const answer = await this.answerRepository.findOne({ where: { id } });

      if (!answer) {
        this.logger.warn(`Answer with id ${id} not found`);
        return null;
      }

      await this.answerRepository.update(id, updateAnswerDto);
      const updatedAnswer = await this.answerRepository.findOne({ where: { id } });

      this.logger.log(`Updated answer with id ${id} successfully`);
      return constructSuccessResponse(updatedAnswer);
    } catch (error) {
      this.logger.error(`Error occurred while updating answer with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting answer with id ${id}`);

    try {
      const answer = await this.answerRepository.findOne({ where: { id } });

      if (answer) {
        await this.answerRepository.softDelete(id);
        this.logger.log(`Deleted answer with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Answer with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Answer not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting answer with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }
}
