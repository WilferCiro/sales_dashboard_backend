// Nest

// Domain
import { DomainCreateShopDto } from '../dto/shop.create.dto';
import { DomainUpdateShopDto } from '../dto/shop.update.dto';
import { Shop } from '../entities/shop.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface ShopRepository {
  findById(id: number): Promise<Shop>;
  findAll(): Promise<Shop[]>;
  findSearch(search: string): Promise<Shop[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Shop>>;

  create(shop: DomainCreateShopDto): Promise<Shop>;
  update(id: number, shop: DomainUpdateShopDto): Promise<Shop>;
}
