import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  sku: string;

  @IsOptional()
  presentation: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  barcode: string;

  @IsNotEmpty()
  category: number;

  @IsNotEmpty()
  shop: number;
}
