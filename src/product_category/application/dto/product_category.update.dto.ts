import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
