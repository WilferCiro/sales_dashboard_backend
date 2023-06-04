import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { User } from '../entities/user.type';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { DomainUpdateUserDto } from '../dto/user.update.dto';

export interface UserService {
  findById(id: number): Promise<User>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>>;
  findSearch(search: string): Promise<User[]>;
  getByEmail(email: string): Promise<User>;
  create(user: User, sendMail?: boolean): Promise<User>;
  update(id: number, user: DomainUpdateUserDto): Promise<User>;
  export(): Promise<Buffer>;
  getRolesById(id: number): Promise<[string]>;
}
