import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMCQDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsBoolean()
  isGlobal: boolean;

  @IsBoolean()
  multiSelect: boolean;
}
