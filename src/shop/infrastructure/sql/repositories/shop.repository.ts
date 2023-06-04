import { BadRequestException, Injectable } from '@nestjs/common';
import { ShopRepository } from '../../../domain/interfaces/shop.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { ShopEntity } from '../entities/shop.entity';
import { Shop } from 'src/shop/domain/entities/shop.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateShopDto } from 'src/shop/domain/dto/shop.update.dto';
import { DomainCreateShopDto } from 'src/shop/domain/dto/shop.create.dto';

@Injectable()
export class ShopRepositoryImpl implements ShopRepository {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly repository: Repository<ShopEntity>,
  ) {}

  async findAll(): Promise<Shop[]> {
    return await this.repository.findBy({ active: true });
  }

  async findSearch(search: string): Promise<Shop[]> {
    const filters = {
      where: [{ name: ILike(`%${search}%`) }, { nit: ILike(`%${search}%`) }],
    };
    return await this.repository.find({ ...filters, take: 20 });
  }

  async findById(id: number): Promise<Shop> {
    return await this.repository.findOne({
      where: { id },
      relations: ['headquarters'],
    });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Shop>> {
    const filters = {
      where: [
        { name: ILike(`%${pagination.search}%`) },
        { nit: ILike(`%${pagination.search}%`) },
        { phone: ILike(`%${pagination.search}%`) },
        { email: ILike(`%${pagination.search}%`) },
        { website: ILike(`%${pagination.search}%`) },
        { owner: { firstName: ILike(`%${pagination.search}%`) } },
        { owner: { lastName: ILike(`%${pagination.search}%`) } },
      ],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(shop: DomainCreateShopDto): Promise<Shop> {
    const exists = false; // TODO: check if exists
    if (exists) {
      throw new BadRequestException(`El registro ya existe`);
    }
    return await this.repository.save(shop);
  }

  async update(id: number, shop: DomainUpdateShopDto): Promise<Shop> {
    return await this.repository.save({ id, ...shop });
  }
}
