import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/users/domain/entities/user.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateUserDto } from 'src/users/domain/dto/user.update.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<User> {
    return await this.repository.findOneBy({ id: id });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  async findSearch(search: string): Promise<User[]> {
    const splitted = search.split(' ');
    const where = [];
    splitted.forEach((split: string) => {
      where.push(
        ...[
          { firstName: ILike(`%${split}%`) },
          { lastName: ILike(`%${split}%`) },
        ],
      );
    });
    const filters = {
      where,
    };
    return await this.repository.find({ ...filters, take: 20 });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>> {
    const filters = {
      where: [
        { firstName: ILike(`%${pagination.search}%`) },
        { lastName: ILike(`%${pagination.search}%`) },
        { email: ILike(`%${pagination.search}%`) },
        { phone: ILike(`%${pagination.search}%`) },
      ],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      order: {
        [pagination.sort || 'id']: pagination.sortOrder === 1 ? 'DESC' : 'ASC',
      },
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(user: User): Promise<User> {
    const exists = await this.getByEmail(user.email);
    if (exists) {
      throw new BadRequestException(
        `El correo ${user.email} ya está registrado`,
      );
    }
    return await this.repository.save(user);
  }

  async update(id: number, user: DomainUpdateUserDto): Promise<User> {
    const exists = await this.findById(id);
    if (!exists) {
      throw new BadRequestException(`El usuario no está registrado`);
    }
    return await this.repository.save({ id, ...user });
  }
}
