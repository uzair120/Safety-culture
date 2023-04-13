import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SuccessResponseDto<T> {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  data: T;

  @IsNotEmpty()
  @IsBoolean()
  success = true;
}
