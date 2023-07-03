// Nest
import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

// Application
import { ShopMapper } from '../../application/mapper/shop.mapper';
import { CreateShopDto } from '../../application/dto/shop.create.dto';
import { UpdateShopDto } from '../../application/dto/shop.update.dto';
import { ShopDto } from '../../application/dto/shop.dto';
// Domain
import { ShopService } from 'src/shop/domain/interfaces/shop.service.interface';
import { Shop } from 'src/shop/domain/entities/shop.type';

// Shared
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { Response } from 'express';
import { Roles } from 'src/shared/application/decorators/roles.decorator';
import { SelectDto } from 'src/shared/application/dto/select.dto';
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';

@Controller('shops')
export class ShopController extends BaseController {
  private mapper: ShopMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject('ShopService') private readonly service: ShopService) {
    super();
    this.mapper = new ShopMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<ShopDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Shop) => this.mapper.toDto(d));
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('select')
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || '';
    const data = await this.service.findSearch(search);
    return data.map((d: ShopDto) => this.mapper.toDtoSelect(d));
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<ShopDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Shop) => this.mapper.toDto(d)),
    };
  }

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Post('export')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  async export(@Res() res: Response) {
    const data = await this.service.export();
    res.send(data);
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ShopDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() shop: CreateShopDto): Promise<ShopDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(shop));
    return this.mapper.toDto(data);
  }

  @Roles('admin', 'seller')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() shop: UpdateShopDto,
  ): Promise<ShopDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(shop),
    );
    return this.mapper.toDto(data);
  }
}
