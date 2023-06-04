import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../../domain/interfaces/department.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { Department } from 'src/department/domain/entities/department.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateDepartmentDto } from 'src/department/domain/dto/department.update.dto';
import { DomainCreateDepartmentDto } from 'src/department/domain/dto/department.create.dto';

@Injectable()
export class DepartmentRepositoryImpl implements DepartmentRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly repository: Repository<DepartmentEntity>,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Department> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Department>> {
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

  async create(department: DomainCreateDepartmentDto): Promise<Department> {
    const exists = false; // TODO: check if exists
    if (exists) {
      throw new BadRequestException(`El registro ya existe`);
    }
    return await this.repository.save(department);
  }

  async update(
    id: number,
    department: DomainUpdateDepartmentDto,
  ): Promise<Department> {
    return await this.repository.save({ id, ...department });
  }
}
