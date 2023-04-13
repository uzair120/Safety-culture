import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ResponseDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  data: unknown;

  @IsNotEmpty()
  error?: unknown;

  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsString()
  stackTrace?: string;
}
