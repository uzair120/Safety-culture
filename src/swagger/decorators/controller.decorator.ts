import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  // ApiSecurity,
  // ApiUnauthorizedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
  ApiBadRequestResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { SwaggerExceptionResponseDto } from '../dto/api.generic-error-response.dto';

// import {
//   ApiUnauthorizedResponseDto,
//   SwaggerExceptionResponseDto,
// } from '../dto';

export const SwaggerController = (apiController) => {
  return applyDecorators(
    ApiTags(apiController),
    ApiSecurity('Authorization'),
    // ApiUnauthorizedResponse({
    //   type: ApiUnauthorizedResponseDto,
    // }),
    ApiBadRequestResponse({
      type: SwaggerExceptionResponseDto,
    }),
    ApiServiceUnavailableResponse({ type: SwaggerExceptionResponseDto }),
  );
};
