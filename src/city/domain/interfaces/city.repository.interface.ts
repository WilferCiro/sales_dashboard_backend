// Nest

// Domain
import { DomainCreateCityDto } from '../dto/city.create.dto';
import { DomainUpdateCityDto } from '../dto/city.update.dto';
import { City } from '../entities/city.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface CityRepository {
  findById(id: number): Promise<City>;
  findSearch(search: string): Promise<City[]>;
  findAll(): Promise<City[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<City>>;

  create(city: DomainCreateCityDto): Promise<City>;
  update(id: number, city: DomainUpdateCityDto): Promise<City>;
}
