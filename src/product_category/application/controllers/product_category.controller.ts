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
import { ProductCategoryMapper } from '../mapper/product_category.mapper';
import { CreateProductCategoryDto } from '../dto/product_category.create.dto';
import { UpdateProductCategoryDto } from '../dto/product_category.update.dto';
import { ProductCategoryDto } from '../dto/product_category.dto';
// Domain
import { ProductCategoryService } from 'src/product_category/domain/interfaces/product_category.service.interface';
import { ProductCategory } from 'src/product_category/domain/entities/product_category.type';

// Shared
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Roles } from 'src/shared/application/decorators/roles.decorator';
import { SelectDto } from 'src/shared/application/dto/select.dto';

@Controller('product_categories')
export class ProductCategoryController extends BaseController {
  private mapper: ProductCategoryMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject('ProductCategoryService')
    private readonly service: ProductCategoryService,
  ) {
    super();
    this.mapper = new ProductCategoryMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<ProductCategoryDto[]> {
    const data = await this.service.findAll();
    return data.map((d: ProductCategory) => this.mapper.toDto(d));
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('select')
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || '';
    const data = await this.service.findSearch(search);
    return data.map((d: ProductCategory) => this.mapper.toDtoSelect(d));
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<ProductCategoryDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: ProductCategory) => this.mapper.toDto(d)),
    };
  }

  @Roles('general')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductCategoryDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @Post()
  async create(
    @Body() productCategory: CreateProductCategoryDto,
  ): Promise<ProductCategoryDto> {
    const data = await this.service.create(
      this.mapper.toDomainCreate(productCategory),
    );
    return this.mapper.toDto(data);
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() productCategory: UpdateProductCategoryDto,
  ): Promise<ProductCategoryDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(productCategory),
    );
    return this.mapper.toDto(data);
  }
}
