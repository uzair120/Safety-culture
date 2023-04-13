/* istanbul ignore file */

export class ValidationBadRequestResponseDto {
  statusCode = 400;
  message: string;
  error = 'Bad Request';
}

export class ApiBadRequestResponseDto {
  message: string;
  data: object = {};
  success: boolean;
}
