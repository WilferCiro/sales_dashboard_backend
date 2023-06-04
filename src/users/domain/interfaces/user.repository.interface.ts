import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { User } from '../entities/user.type';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainUpdateUserDto } from '../dto/user.update.dto';

export interface UserRepository {
  findById(id: number): Promise<User>;
  getByEmail(email: string): Promise<User>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>>;
  findSearch(search: string): Promise<User[]>;
  create(user: User): Promise<User>;
  update(id: number, user: DomainUpdateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
}
