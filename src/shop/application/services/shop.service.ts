// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Shop } from 'src/shop/domain/entities/shop.type';
import { ShopRepository } from 'src/shop/domain/interfaces/shop.repository.interface';
import { ShopService } from 'src/shop/domain/interfaces/shop.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainCreateShopDto } from 'src/shop/domain/dto/shop.create.dto';
import { DomainUpdateShopDto } from 'src/shop/domain/dto/shop.update.dto';
import { shopExcelHeaders } from '../constants/excel.export.header';
import { FilesServiceInterface } from 'src/files/domain/interfaces/files.service.interface';

@Injectable()
export class ShopServiceImpl implements ShopService {
  constructor(
    @Inject('ShopRepository')
    private readonly repository: ShopRepository,
    @Inject('FilesService')
    private readonly filesService: FilesServiceInterface,
  ) {}

  async findAll(): Promise<Shop[]> {
    return await this.repository.findAll();
  }

  async findSearch(search: string): Promise<Shop[]> {
    return await this.repository.findSearch(search);
  }

  async findById(id: number): Promise<Shop> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Shop>> {
    return await this.repository.findPaginated(pagination);
  }

  async export(): Promise<Buffer> {
    const users = await this.repository.findAll();
    const columns = shopExcelHeaders;
    return this.filesService.generateExcel(users, columns);
  }

  async create(shop: DomainCreateShopDto): Promise<Shop> {
    return await this.repository.create(shop);
  }

  async update(id: number, shop: DomainUpdateShopDto): Promise<Shop> {
    return await this.repository.update(id, shop);
  }
}
