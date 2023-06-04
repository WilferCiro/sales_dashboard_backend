// Nest

// Domain
import { City } from '../entities/city.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainCreateCityDto } from '../dto/city.create.dto';
import { DomainUpdateCityDto } from '../dto/city.update.dto';

export interface CityService {
  findById(id: number): Promise<City>;
  findSearch(search: string): Promise<City[]>;
  findAll(): Promise<City[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<City>>;
  create(city: DomainCreateCityDto): Promise<City>;
  update(id: number, city: DomainUpdateCityDto): Promise<City>;
}
