// Nest
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

// Application
import { DepartmentMapper } from '../mapper/department.mapper';
import { CreateDepartmentDto } from '../dto/department.create.dto';
import { UpdateDepartmentDto } from '../dto/department.update.dto';
import { DepartmentDto } from '../dto/department.dto';
// Domain
import { DepartmentService } from 'src/department/domain/interfaces/department.service.interface';
import { Department } from 'src/department/domain/entities/department.type';

// Shared
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Roles } from 'src/shared/application/decorators/roles.decorator';

@Controller('departments')
export class DepartmentController extends BaseController {
  private mapper: DepartmentMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject('DepartmentService') private readonly service: DepartmentService,
  ) {
    super();
    this.mapper = new DepartmentMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<DepartmentDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Department) => this.mapper.toDto(d));
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<DepartmentDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Department) => this.mapper.toDto(d)),
    };
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<DepartmentDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() department: CreateDepartmentDto,
  ): Promise<DepartmentDto> {
    const data = await this.service.create(
      this.mapper.toDomainCreate(department),
    );
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() department: UpdateDepartmentDto,
  ): Promise<DepartmentDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(department),
    );
    return this.mapper.toDto(data);
  }
}
