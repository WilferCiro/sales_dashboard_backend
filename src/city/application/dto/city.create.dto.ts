import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  department: number;
}
