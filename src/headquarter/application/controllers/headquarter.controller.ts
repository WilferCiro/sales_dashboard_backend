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
import { HeadquarterMapper } from '../mapper/headquarter.mapper';
import { CreateHeadquarterDto } from '../dto/headquarter.create.dto';
import { UpdateHeadquarterDto } from '../dto/headquarter.update.dto';
import { HeadquarterDto } from '../dto/headquarter.dto';
// Domain
import { HeadquarterService } from 'src/headquarter/domain/interfaces/headquarter.service.interface';
import { Headquarter } from 'src/headquarter/domain/entities/headquarter.type';

// Shared
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Roles } from 'src/shared/application/decorators/roles.decorator';

@Controller('headquarters')
export class HeadquarterController extends BaseController {
  private mapper: HeadquarterMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject('HeadquarterService') private readonly service: HeadquarterService,
  ) {
    super();
    this.mapper = new HeadquarterMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<HeadquarterDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Headquarter) => this.mapper.toDto(d));
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<HeadquarterDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Headquarter) => this.mapper.toDto(d)),
    };
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<HeadquarterDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() headquarter: CreateHeadquarterDto,
  ): Promise<HeadquarterDto> {
    const data = await this.service.create(
      this.mapper.toDomainCreate(headquarter),
    );
    return this.mapper.toDto(data);
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() headquarter: UpdateHeadquarterDto,
  ): Promise<HeadquarterDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(headquarter),
    );
    return this.mapper.toDto(data);
  }
}
