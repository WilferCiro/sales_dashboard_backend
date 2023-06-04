import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/interfaces/product.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Product } from 'src/product/domain/entities/product.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateProductDto } from 'src/product/domain/dto/product.update.dto';
import { DomainCreateProductDto } from 'src/product/domain/dto/product.create.dto';
import { take } from 'rxjs';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<Product> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findSearch(search: string): Promise<Product[]> {
    const filters = {
      where: [{ name: ILike(`%${search}%`) }, { sku: ILike(`%${search}%`) }],
    };
    return await this.repository.find({ ...filters, take: 20 });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Product>> {
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

  async create(product: DomainCreateProductDto): Promise<Product> {
    return await this.repository.save(product);
  }

  async update(id: number, product: DomainUpdateProductDto): Promise<Product> {
    return await this.repository.save({ id, ...product });
  }
}
