// Nest
import { Injectable } from '@nestjs/common';

// Application
import { DepartmentDto } from '../dto/department.dto';

// Domain
import { Department } from 'src/department/domain/entities/department.type';
import { CreateDepartmentDto } from '../dto/department.create.dto';
import { UpdateDepartmentDto } from '../dto/department.update.dto';

// Shared

@Injectable()
export class DepartmentMapper {
  toDomain(departmentDto: DepartmentDto): Department {
    const { id, name, createdAt, updatedAt } = departmentDto;
    return {
      id,
      name,
      createdAt,
      updatedAt,
    };
  }

  toDomainCreate(departmentDto: CreateDepartmentDto): Department {
    const { name } = departmentDto;
    return { name };
  }

  toDomainUpdate(departmentDto: UpdateDepartmentDto): Department {
    const { name } = departmentDto;
    return { name };
  }

  toDto(department: Department): DepartmentDto {
    return department as DepartmentDto;
  }
}
