// Nest

// Domain
import { DomainCreateDepartmentDto } from '../dto/department.create.dto';
import { DomainUpdateDepartmentDto } from '../dto/department.update.dto';
import { Department } from '../entities/department.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface DepartmentService {
  findById(id: number): Promise<Department>;
  findAll(): Promise<Department[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Department>>;
  create(department: DomainCreateDepartmentDto): Promise<Department>;
  update(id: number, department: DomainUpdateDepartmentDto): Promise<Department>;
}
