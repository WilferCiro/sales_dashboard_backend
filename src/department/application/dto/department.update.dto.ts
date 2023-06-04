import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
