import { Injectable } from '@nestjs/common';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedDto } from '../dto/paginated.get.dto';

@Injectable()
export class PaginationMapper {
  toDomain(paginationDto: PaginatedDto): DomainPaginationDto {
    const { page, count, sort, sortOrder, search } = paginationDto;
    return {
      page: page || 0,
      count: count || 10,
      sort: sort || 'id',
      sortOrder: sortOrder || -1,
      search: search || '',
    };
  }
}
