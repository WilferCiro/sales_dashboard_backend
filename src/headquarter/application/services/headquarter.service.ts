// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Headquarter } from 'src/headquarter/domain/entities/headquarter.type';
import { HeadquarterRepository } from 'src/headquarter/domain/interfaces/headquarter.repository.interface';
import { HeadquarterService } from 'src/headquarter/domain/interfaces/headquarter.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainUpdateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.update.dto';
import { DomainCreateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.create.dto';

@Injectable()
export class HeadquarterServiceImpl implements HeadquarterService {
  constructor(
    @Inject('HeadquarterRepository')
    private readonly repository: HeadquarterRepository,
  ) {}

  async findAll(): Promise<Headquarter[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Headquarter> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Headquarter>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(headquarter: DomainCreateHeadquarterDto): Promise<Headquarter> {
    return await this.repository.create(headquarter);
  }

  async update(
    id: number,
    headquarter: DomainUpdateHeadquarterDto,
  ): Promise<Headquarter> {
    return await this.repository.update(id, headquarter);
  }
}
