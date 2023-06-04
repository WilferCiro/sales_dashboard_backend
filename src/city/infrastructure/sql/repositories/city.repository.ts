import { BadRequestException, Injectable } from '@nestjs/common';
import { CityRepository } from '../../../domain/interfaces/city.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { City } from 'src/city/domain/entities/city.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateCityDto } from 'src/city/domain/dto/city.update.dto';
import { DomainCreateCityDto } from 'src/city/domain/dto/city.create.dto';

@Injectable()
export class CityRepositoryImpl implements CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async findAll(): Promise<City[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<City> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findSearch(search: string): Promise<City[]> {
    const splitted = search.split(' ');
    const where = [];
    splitted.forEach((split: string) => {
      where.push({ name: ILike(`%${split}%`) });
    });
    const filters = {
      where,
    };
    return await this.repository.find({ ...filters, take: 20 });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<City>> {
    const filters = {
      where: [{ name: ILike(`%${pagination.search}%`) }],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(city: DomainCreateCityDto): Promise<City> {
    return await this.repository.save(city);
  }

  async update(id: number, city: DomainUpdateCityDto): Promise<City> {
    const exists = await this.findById(id); // TODO: check if exists
    if (!exists) {
      throw new BadRequestException(`No existe una ciudad con el ID ${id}`);
    }
    return await this.repository.save({ id, ...city });
  }
}
