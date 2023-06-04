import { IsNotEmpty } from 'class-validator';

export class CreateHeadquarterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: number;

  @IsNotEmpty()
  shop: number;
}
