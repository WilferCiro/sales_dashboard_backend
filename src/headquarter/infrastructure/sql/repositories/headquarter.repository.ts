import { Injectable } from '@nestjs/common';
import { HeadquarterRepository } from '../../../domain/interfaces/headquarter.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { HeadquarterEntity } from '../entities/headquarter.entity';
import { Headquarter } from 'src/headquarter/domain/entities/headquarter.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.update.dto';
import { DomainCreateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.create.dto';

@Injectable()
export class HeadquarterRepositoryImpl implements HeadquarterRepository {
  constructor(
    @InjectRepository(HeadquarterEntity)
    private readonly repository: Repository<HeadquarterEntity>,
  ) {}

  async findAll(): Promise<Headquarter[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<Headquarter> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Headquarter>> {
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

  async create(headquarter: DomainCreateHeadquarterDto): Promise<Headquarter> {
    return await this.repository.save(headquarter);
  }

  async update(
    id: number,
    headquarter: DomainUpdateHeadquarterDto,
  ): Promise<Headquarter> {
    return await this.repository.save({ id, ...headquarter });
  }
}
