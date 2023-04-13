import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';

import { ResponseDto } from '../dtos';
import { SERVER_RESPONSES } from '../constants';

const {
  BAD_REQUEST_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = SERVER_RESPONSES;

const exceptions = {
  400: BadRequestException,
  401: UnauthorizedException,
  404: NotFoundException,
  500: InternalServerErrorException,
  502: InternalServerErrorException,
  503: InternalServerErrorException,
};
const errorMessages = {
  400: BAD_REQUEST_MESSAGE,
  401: UNAUTHORIZED_MESSAGE,
  404: NOT_FOUND_MESSAGE,
  500: SERVER_ERROR_MESSAGE,
  502: SERVER_ERROR_MESSAGE,
  503: SERVER_ERROR_MESSAGE,
};
export const constructErrorResponse = async (error) => {
  [
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  ].forEach((Exception) => {
    if (error instanceof Exception) {
      throw error;
    }
  });

  const status =
    error.status || error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const serverError: ResponseDto = {
    message: error.message || errorMessages[status],
    data: error.data || {},
    error: error.error,
    success: false,
  };

  serverError.stackTrace = JSON.stringify(error.stack);

  const exception = exceptions[status];
  throw new exception(serverError);
};
