import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, refs } from '@nestjs/swagger';

import {
  ValidationBadRequestResponseDto,
  ApiBadRequestResponseDto,
} from '../dto';

export const SwaggerBadRequestResponse = () => {
  return applyDecorators(
    ApiExtraModels(ValidationBadRequestResponseDto, ApiBadRequestResponseDto),
    ApiResponse({
      status: 400,
      schema: {
        oneOf: refs(ValidationBadRequestResponseDto, ApiBadRequestResponseDto),
      },
    }),
  );
};
