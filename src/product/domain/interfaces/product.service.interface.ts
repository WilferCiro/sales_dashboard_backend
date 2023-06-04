// Nest

// Domain
import { DomainCreateProductDto } from '../dto/product.create.dto';
import { DomainUpdateProductDto } from '../dto/product.update.dto';
import { Product } from '../entities/product.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface ProductService {
  findById(id: number): Promise<Product>;
  findAll(): Promise<Product[]>;
  findSearch(search: string): Promise<Product[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Product>>;
  create(product: DomainCreateProductDto): Promise<Product>;
  update(id: number, product: DomainUpdateProductDto): Promise<Product>;
}
