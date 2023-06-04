import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  department?: number;
}
