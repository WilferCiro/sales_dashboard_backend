import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
