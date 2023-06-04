import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;

  @IsOptional()
  sku: string;

  @IsOptional()
  presentation: string;

  @IsOptional()
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  barcode: string;

  @IsOptional()
  category: number;

  @IsOptional()
  shop: number;
}
