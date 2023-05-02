import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOptionsDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsNumber()
  multiChoiceResponseId: number;

  @IsNumber()
  @IsOptional()
  score: number;
}
