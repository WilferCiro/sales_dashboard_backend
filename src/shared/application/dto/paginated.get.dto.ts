import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginatedDto {
  @Type(() => Number)
  @IsInt()
  page: number;

  @Type(() => Number)
  @IsInt()
  count: number;

  @IsOptional()
  sort: string;

  @Type(() => Number)
  @IsOptional()
  sortOrder: 1 | -1;

  @IsOptional()
  search: string;
}
