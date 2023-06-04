import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nit?: string;

  @IsNotEmpty()
  owner?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  website?: string;

  @IsNotEmpty()
  active: boolean;
}
