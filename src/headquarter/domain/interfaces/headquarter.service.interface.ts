// Nest

// Domain
import { DomainCreateHeadquarterDto } from '../dto/headquarter.create.dto';
import { DomainUpdateHeadquarterDto } from '../dto/headquarter.update.dto';
import { Headquarter } from '../entities/headquarter.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface HeadquarterService {
  findById(id: number): Promise<Headquarter>;
  findAll(): Promise<Headquarter[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Headquarter>>;
  create(headquarter: DomainCreateHeadquarterDto): Promise<Headquarter>;
  update(id: number, headquarter: DomainUpdateHeadquarterDto): Promise<Headquarter>;
}
