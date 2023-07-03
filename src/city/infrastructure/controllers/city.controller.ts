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
import { CityMapper } from '../../application/mapper/city.mapper';
import { CreateCityDto } from '../../application/dto/city.create.dto';
import { UpdateCityDto } from '../../application/dto/city.update.dto';
import { CityDto } from '../../application/dto/city.dto';
// Domain
import { CityService } from 'src/city/domain/interfaces/city.service.interface';
import { City } from 'src/city/domain/entities/city.type';

// Shared
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Roles } from 'src/shared/application/decorators/roles.decorator';
import { SelectDto } from 'src/shared/application/dto/select.dto';

@Controller('cities')
export class CityController extends BaseController {
  private mapper: CityMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject('CityService') private readonly service: CityService) {
    super();
    this.mapper = new CityMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<CityDto[]> {
    const data = await this.service.findAll();
    return data.map((d: City) => this.mapper.toDto(d));
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<CityDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: City) => this.mapper.toDto(d)),
    };
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('select')
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || '';
    const data = await this.service.findSearch(search);
    return data.map((d: CityDto) => this.mapper.toDtoSelect(d));
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<CityDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() city: CreateCityDto): Promise<CityDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(city));
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() city: UpdateCityDto,
  ): Promise<CityDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(city),
    );
    return this.mapper.toDto(data);
  }
}
