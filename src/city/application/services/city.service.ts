// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { City } from 'src/city/domain/entities/city.type';
import { CityRepository } from 'src/city/domain/interfaces/city.repository.interface';
import { CityService } from 'src/city/domain/interfaces/city.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainCreateCityDto } from 'src/city/domain/dto/city.create.dto';
import { DomainUpdateCityDto } from 'src/city/domain/dto/city.update.dto';

@Injectable()
export class CityServiceImpl implements CityService {
  constructor(
    @Inject('CityRepository')
    private readonly repository: CityRepository,
  ) {}

  async findAll(): Promise<City[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<City> {
    return await this.repository.findById(id);
  }

  async findSearch(search: string): Promise<City[]> {
    return await this.repository.findSearch(search);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<City>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(city: DomainCreateCityDto): Promise<City> {
    return await this.repository.create(city);
  }

  async update(id: number, city: DomainUpdateCityDto): Promise<City> {
    return await this.repository.update(id, city);
  }
}
