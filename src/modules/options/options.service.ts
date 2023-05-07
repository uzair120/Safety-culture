import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { constructSuccessResponse, constructErrorResponse, ResponseDto } from '../../common';
import { Options } from './entities/options.entity';
import { CreateOptionsDto, UpdateOptionsDto } from './dto';

@Injectable()
export class OptionsService {
  private readonly logger = new Logger(OptionsService.name);

  constructor(
    @InjectRepository(Options)
    private readonly optionsRepository: Repository<Options>,
  ) {}

  async create(createOptionsDto: CreateOptionsDto): Promise<ResponseDto> {
    this.logger.log(`Creating Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId}`);

    try {
      const data = await this.optionsRepository.save(createOptionsDto);
      this.logger.log(
        `Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId} created successfully`,
      );
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while creating Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId}`,
        error.stack,
      );
      return constructErrorResponse(error);
    }
  }

  async createInternal(createOptionsDto: UpdateOptionsDto) {
    this.logger.log(`Creating Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId}`);

    try {
      let data = {};
      if (createOptionsDto.id) {
        await this.optionsRepository.update(createOptionsDto.id, createOptionsDto);
        data = await this.optionsRepository.findOne({ where: { id: createOptionsDto.id } });
      } else {
        data = await this.optionsRepository.save(createOptionsDto);
        this.logger.log(
          `Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId} created successfully`,
        );
      }
      return data;
    } catch (error) {
      this.logger.error(
        `Error occurred while creating Options with multiChoiceResponseId ${createOptionsDto.multiChoiceResponseId}`,
        error.stack,
      );
      return error;
    }
  }

  async findAll(): Promise<ResponseDto> {
    this.logger.log(`Fetching all Optionss`);

    try {
      const data = await this.optionsRepository.find();
      this.logger.log(`Fetched all Optionss successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching all Optionss`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    this.logger.log(`Fetching Options with id ${id}`);

    try {
      const data = await this.optionsRepository.findOne({ where: { id } });

      if (!data) {
        this.logger.warn(`Options with id ${id} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Options not found',
        });
      }

      this.logger.log(`Fetched Options with id ${id} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(`Error occurred while fetching Options with id ${id}`, error.stack);
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the Options',
        error: error.message,
      });
    }
  }

  async update(id: number, updateOptionsDto: UpdateOptionsDto): Promise<ResponseDto> {
    this.logger.log(`Updating Options with id ${id}`);

    try {
      const options = await this.optionsRepository.findOne({
        where: { id },
      });

      if (!options) {
        this.logger.warn(`Options with id ${id} not found`);
        return null;
      }

      await this.optionsRepository.update(id, updateOptionsDto);
      const updatedOptions = await this.optionsRepository.findOne({
        where: { id },
      });

      this.logger.log(`Updated Options with id ${id} successfully`);
      return constructSuccessResponse(updatedOptions);
    } catch (error) {
      this.logger.error(`Error occurred while updating Options with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async delete(id: number): Promise<ResponseDto> {
    this.logger.log(`Deleting Options with id ${id}`);

    try {
      const options = await this.optionsRepository.findOne({ where: { id } });

      if (options) {
        await this.optionsRepository.softDelete(id);
        this.logger.log(`Deleted Options with id ${id} successfully`);
        return constructSuccessResponse(true);
      }

      this.logger.warn(`Options with id ${id} not found`);
      return constructErrorResponse({
        status: HttpStatus.NOT_FOUND,
        message: 'Options not found',
      });
    } catch (error) {
      this.logger.error(`Error occurred while deleting Options with id ${id}`, error.stack);
      return constructErrorResponse(error);
    }
  }

  async findBtResponsesNameId(multiChoiceResponseId: number): Promise<ResponseDto> {
    this.logger.log(`Fetching Optionss with multiChoiceResponseId ${multiChoiceResponseId}`);

    try {
      const data = await this.optionsRepository.find({
        where: { multiChoiceResponseId: multiChoiceResponseId },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`Optionss with multiChoiceResponseId ${multiChoiceResponseId} not found`);
        return constructErrorResponse({
          status: HttpStatus.NOT_FOUND,
          message: 'Optionss not found',
        });
      }

      this.logger.log(`Fetched Optionss with multiChoiceResponseId ${multiChoiceResponseId} successfully`);
      return constructSuccessResponse(data);
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching Optionss with multiChoiceResponseId ${multiChoiceResponseId}`,
        error.stack,
      );
      return constructErrorResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching the Optionss',
        error: error.message,
      });
    }
  }
}
