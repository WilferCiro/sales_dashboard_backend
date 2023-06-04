import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateShopDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  nit?: string;

  @IsNotEmpty()
  @IsOptional()
  owner?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  website?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
