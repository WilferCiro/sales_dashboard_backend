// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { ProductCategory } from 'src/product_category/domain/entities/product_category.type';
import { ProductCategoryRepository } from 'src/product_category/domain/interfaces/product_category.repository.interface';
import { ProductCategoryService } from 'src/product_category/domain/interfaces/product_category.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateProductCategoryDto } from 'src/product_category/domain/dto/product_category.create.dto';
import { DomainUpdateProductCategoryDto } from 'src/product_category/domain/dto/product_category.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class ProductCategoryServiceImpl implements ProductCategoryService {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly repository: ProductCategoryRepository,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return await this.repository.findAll();
  }

  async findSearch(search: string): Promise<ProductCategory[]> {
    return await this.repository.findSearch(search);
  }

  async findById(id: number): Promise<ProductCategory> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<ProductCategory>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(
    productCategory: DomainCreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.repository.create(productCategory);
  }

  async update(
    id: number,
    productCategory: DomainUpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.repository.update(id, productCategory);
  }
}
