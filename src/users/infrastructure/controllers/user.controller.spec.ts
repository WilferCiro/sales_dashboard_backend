import { UserService } from 'src/users/domain/interfaces/user.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceImpl } from '../../application/services/user.service';
import { CreateUserDto } from '../../application/dto/user.create.dto';
import {
  userCreateDataFake as registerCreateDataFake,
  userDataFake as registerDataFake,
  userUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/user.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { UserRepositoryImpl } from 'src/users/infrastructure/sql/repositories/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/infrastructure/sql/entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../../application/mapper/user.mapper';

describe('UsersController', () => {
  let usersController: UserController;
  let usersService: UserService;
  let mapper: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryImpl,
        },
        {
          provide: 'UserService',
          useClass: UserServiceImpl,
        },
      ],
    }).compile();
    mapper = new UserMapper();
    usersController = module.get<UserController>(UserController);
    usersService = module.get<UserService>('UserService');
  });

  describe('createUser', () => {
    it('should return the created user', async () => {
      // Arrange
      const userDto: CreateUserDto = registerCreateDataFake[0];
      const createdUser = { id: 1, ...userDto };
      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      // Act
      const result = await usersController.create(userDto);

      // Assert
      expect(result).toEqual({ ...createdUser, password: undefined });
    });
  });

  describe('getUser', () => {
    it('should return the requested user by ID', async () => {
      // Arrange
      const user = registerDataFake[0];
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);

      // Act
      const result = await usersController.findById(user.id);
      // Assert
      expect(result).toEqual(mapper.toDto(user));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(usersService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await usersController.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe('updateUser', () => {
    it('should return the updated user', async () => {
      // Arrange
      const userId = 1;
      const updatedUserDto = registerUpdateDataFake[0];
      const updatedUser = registerDataFake[0];
      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser);

      // Act
      const result = await usersController.update(userId, updatedUserDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedUser));
    });
  });
});
