import { Injectable } from '@nestjs/common';
import { ProductCategoryRepository } from '../../../domain/interfaces/product_category.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { ProductCategoryEntity } from '../entities/product_category.entity';
import { ProductCategory } from 'src/product_category/domain/entities/product_category.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateProductCategoryDto } from 'src/product_category/domain/dto/product_category.update.dto';
import { DomainCreateProductCategoryDto } from 'src/product_category/domain/dto/product_category.create.dto';

@Injectable()
export class ProductCategoryRepositoryImpl
  implements ProductCategoryRepository
{
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly repository: Repository<ProductCategoryEntity>,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return await this.repository.findBy({ active: true });
  }
  async findSearch(search: string): Promise<ProductCategory[]> {
    const filters = {
      where: [{ name: ILike(`%${search}%`) }],
    };
    return await this.repository.find({ ...filters, take: 20 });
  }

  async findById(id: number): Promise<ProductCategory> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<ProductCategory>> {
    const filters = {
      where: [{ name: ILike(`%${pagination.search}%`) }],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(
    productCategory: DomainCreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.repository.save(productCategory);
  }

  async update(
    id: number,
    productCategory: DomainUpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.repository.save({ id, ...productCategory });
  }
}
