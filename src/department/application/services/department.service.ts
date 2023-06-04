// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Department } from 'src/department/domain/entities/department.type';
import { DepartmentRepository } from 'src/department/domain/interfaces/department.repository.interface';
import { DepartmentService } from 'src/department/domain/interfaces/department.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class DepartmentServiceImpl implements DepartmentService {
  constructor(
    @Inject('DepartmentRepository')
    private readonly repository: DepartmentRepository,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Department> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Department>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(department: Department): Promise<Department> {
    return await this.repository.create(department);
  }

  async update(id: number, department: Department): Promise<Department> {
    return await this.repository.update(id, department);
  }
}
