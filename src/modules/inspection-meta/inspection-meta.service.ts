import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { InspectionMeta } from './entities/inspection-meta.entity';
import { CreateInspectionMetaDto, UpdateInspectionMetaDto } from './dto';
import { AnswersService } from '../answers/answers.service';

@Injectable()
export class InspectionMetaService {
  private readonly logger = new Logger(InspectionMetaService.name);

  constructor(
    @InjectRepository(InspectionMeta)
    private readonly inspectionMetaRepository: Repository<InspectionMeta>,
    private readonly answersService: AnswersService,
  ) {}

  async create(createInspectionMetaDto: CreateInspectionMetaDto): Promise<ResponseDto> {
    this.logger.log(`Creating inspection metadata with template_id ${createInspectionMetaDto.templateId}`);

    try {
      const data = await this.inspectionMetaRepository.save(createInspectionMetaDto);
      this.logger.log(
        `Inspection metadata with template_id ${createInspectionMetaDto.templateId} created successfully`,
      );
      if (createInspectionMetaDto.createAnswerDto && createInspectionMetaDto.createAnswerDto.length > 0) {
        for (let index = 0; index < createInspectionMetaDto.createAnswerDto.length; index++) {
          const answer = createInspectionMetaDto.createAnswerDto[index];
          answer.inspectionMetaId = data.id;
          await this.answersService.create(answer);
        }
      }
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating inspection metadata with template_id ${createInspectionMetaDto.templateId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all inspection metadata`);

    try {
      const data = await this.inspectionMetaRepository.find();
      this.logger.log(`Fetched all inspection metadata successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all inspection metadata`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching inspection metadata with id ${id}`);

    try {
      const data = await this.inspectionMetaRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Inspection metadata with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Inspection metadata not found',
        });
      }
      // else{
      // const answers = await this.answersService.findByMetaId(data.id);
      // data['answers'] = answers;
      // }

      this.logger.log(`Fetched inspection metadata with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching inspection metadata with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the inspection metadata',
        error: error.message,
      });
    }
  }

  async update(id: number, updateInspectionMetaDto: UpdateInspectionMetaDto): Promise<ResponseDto> {
    this.logger.log(`Updating inspection metadata with id ${id}`);

    try {
      const inspectionMeta = await this.inspectionMetaRepository.findOne({
        where: { id },
      });

      if (!inspectionMeta) {
        this.logger.warn(`Inspection metadata with id ${id} not found`);
        return null;
      }

      await this.inspectionMetaRepository.update(id, updateInspectionMetaDto);
      const updatedInspectionMeta = await this.inspectionMetaRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated inspection metadata with id ${id} successfully`);
      return constructSuccessResponse(updatedInspectionMeta);
    } catch (error) {
      this.logger.error(`Error occurred while updating inspection metadata with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting inspection metadata with id ${id}`);

    try {
      const inspectionMeta = await this.inspectionMetaRepository.findOne({ where: { id } });

      if (!inspectionMeta) {
        this.logger.warn(`Inspection metadata with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Inspection metadata not found',
        });
      }

      await this.inspectionMetaRepository.delete(id);
      this.logger.log(`Deleted inspection metadata with id ${id} successfully`);
      return constructSuccessResponse({
        message: 'Inspection metadata deleted successfully',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting inspection metadata with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while deleting the inspection metadata',
        error: error.message,
      });
    }
  }
}
