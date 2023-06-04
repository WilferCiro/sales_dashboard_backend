import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHeadquarterDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;

  @IsOptional()
  address: string;

  @IsOptional()
  city: number;

  @IsOptional()
  shop: number;
}
