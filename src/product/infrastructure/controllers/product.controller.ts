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
import { ProductMapper } from '../../application/mapper/product.mapper';
import { CreateProductDto } from '../../application/dto/product.create.dto';
import { UpdateProductDto } from '../../application/dto/product.update.dto';
import { ProductDto } from '../../application/dto/product.dto';
// Domain
import { ProductService } from 'src/product/domain/interfaces/product.service.interface';
import { Product } from 'src/product/domain/entities/product.type';

// Shared
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Roles } from 'src/shared/application/decorators/roles.decorator';

@Controller('products')
export class ProductController extends BaseController {
  private mapper: ProductMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject('ProductService') private readonly service: ProductService,
  ) {
    super();
    this.mapper = new ProductMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<ProductDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Product) => this.mapper.toDto(d));
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('search')
  async findSearch(@Query() query): Promise<ProductDto[]> {
    const search = query.search || '';
    const data = await this.service.findSearch(search);
    return data.map((d: Product) => this.mapper.toDtoSelect(d));
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<ProductDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Product) => this.mapper.toDto(d)),
    };
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }
  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() product: CreateProductDto): Promise<ProductDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(product));
    return this.mapper.toDto(data);
  }
  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ): Promise<ProductDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(product),
    );
    return this.mapper.toDto(data);
  }
}
