import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;
}
