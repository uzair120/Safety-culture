import { SuccessResponseDto } from '../dtos';

import { SERVER_RESPONSES } from '../constants';
const { OK_MESSAGE } = SERVER_RESPONSES;

export const constructSuccessResponse = <T>(
  data: T,
  message?: string,
): SuccessResponseDto<T> => {
  const response = {
    message: message || OK_MESSAGE,
    data: data,
    success: true,
  };

  return response;
};
