import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository.interface';
import { UserService } from '../../domain/interfaces/user.service.interface';
import { User } from 'src/users/domain/entities/user.type';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { MailServiceInterface } from 'src/email/domain/interfaces/email.service.interface';
import { DomainUpdateUserDto } from 'src/users/domain/dto/user.update.dto';
import { FilesServiceInterface } from 'src/files/domain/interfaces/files.service.interface';
import { userExcelHeaders } from '../constants/excel.export.header';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    @Inject('EmailService') private readonly mailService: MailServiceInterface,
    @Inject('FilesService')
    private readonly filesService: FilesServiceInterface,
    private passwordHelper: PasswordHelper,
  ) {}

  async findById(id: number): Promise<User> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>> {
    return await this.repository.findPaginated(pagination);
  }
  async findSearch(search: string): Promise<User[]> {
    return await this.repository.findSearch(search);
  }

  async getRolesById(id: number): Promise<[string]> {
    return ['admin'];
  }

  async export(): Promise<Buffer> {
    const users = await this.repository.findAll();
    const columns = userExcelHeaders;
    return this.filesService.generateExcel(users, columns);
  }

  async create(user: User, sendMail?: boolean): Promise<User> {
    user.password = await this.passwordHelper.encrypt(user.password);
    const created = await this.repository.create(user);
    if (sendMail) {
      this.mailService.sendMail(
        'wilcirom@gmail.com',
        'usuario creado',
        'Prueba',
        created,
      );
    }
    return created;
  }

  async update(id: number, user: DomainUpdateUserDto): Promise<User> {
    return await this.repository.update(id, user);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.repository.getByEmail(email);
  }
}
