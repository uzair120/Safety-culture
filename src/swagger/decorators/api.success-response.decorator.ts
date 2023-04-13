import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { SuccessResponseDto } from '../dto';

export const SwaggerSuccessResponse = (
  dataPropertyDto,
  apiDetails: { description: string; summary: string },
  statusCode = 200,
) => {
  return applyDecorators(
    ApiOperation({
      summary: apiDetails.summary,
      description: apiDetails.description,
    }),
    ApiExtraModels(SuccessResponseDto, dataPropertyDto),
    ApiResponse({
      status: statusCode,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataPropertyDto) },
              },
            },
          },
        ],
      },
    }),
  );
};
