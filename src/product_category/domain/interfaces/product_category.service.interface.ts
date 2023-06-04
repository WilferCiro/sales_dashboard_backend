// Nest

// Domain
import { DomainCreateProductCategoryDto } from '../dto/product_category.create.dto';
import { DomainUpdateProductCategoryDto } from '../dto/product_category.update.dto';
import { ProductCategory } from '../entities/product_category.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface ProductCategoryService {
  findById(id: number): Promise<ProductCategory>;
  findAll(): Promise<ProductCategory[]>;
  findSearch(search: string): Promise<ProductCategory[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<ProductCategory>>;
  create(
    productCategory: DomainCreateProductCategoryDto,
  ): Promise<ProductCategory>;
  update(
    id: number,
    productCategory: DomainUpdateProductCategoryDto,
  ): Promise<ProductCategory>;
}
