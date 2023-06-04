// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Product } from 'src/product/domain/entities/product.type';
import { ProductRepository } from 'src/product/domain/interfaces/product.repository.interface';
import { ProductService } from 'src/product/domain/interfaces/product.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainCreateProductDto } from 'src/product/domain/dto/product.create.dto';
import { DomainUpdateProductDto } from 'src/product/domain/dto/product.update.dto';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async findSearch(search: string): Promise<Product[]> {
    return await this.repository.findSearch(search);
  }

  async findById(id: number): Promise<Product> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Product>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(product: DomainCreateProductDto): Promise<Product> {
    return await this.repository.create(product);
  }

  async update(id: number, product: DomainUpdateProductDto): Promise<Product> {
    return await this.repository.update(id, product);
  }
}
