import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

// User specific
import { UserRepositoryImpl } from './user.repository';
import { UserEntity } from '../entities/user.entity';
import { userDataFake as registerDataFake } from 'src/test/mock/user.sql.fake';

describe('UserRepository', () => {
  let repository: UserRepositoryImpl;
  let repositoryMock: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [UserEntity],
          logging: false,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      providers: [UserRepositoryImpl],
    }).compile();

    repository = module.get<UserRepositoryImpl>(UserRepositoryImpl);
    repositoryMock = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('createUser', () => {
    it('should create a new register', async () => {
      const newUser: UserEntity = registerDataFake[0];
      await repository.create(newUser);
      const data = await repositoryMock.findBy({ lastName: newUser.lastName });
      expect(data[0].firstName).toBe(newUser.firstName);
    });
    it('should not create a new register', async () => {
      const newUser: UserEntity = registerDataFake[0];
      const existUser: UserEntity = registerDataFake[1];
      const user = new UserEntity();
      Object.assign(user, existUser);
      user.email = newUser.email;
      await repositoryMock.save(user);

      await expect(repository.create(newUser)).rejects.not.toThrow(
        new BadRequestException(
          `El correo ${existUser.email} ya está registrado`,
        ),
      );
    });
  });

  describe('updateUser', () => {
    it('should update a register', async () => {
      const register: UserEntity = registerDataFake[0];
      const register2: UserEntity = registerDataFake[1];

      const user = new UserEntity();
      Object.assign(user, register);
      await repositoryMock.save(user);

      const result = await repository.update(register.id, register2);
      expect(result).toEqual(register2);
    });
    it('should not update a register', async () => {
      const register: UserEntity = registerDataFake[0];

      await expect(repository.update(register.id, register)).rejects.toThrow(
        new BadRequestException(`El usuario no está registrado`),
      );
    });
  });

  describe('getUser', () => {
    it('should findSearch registers', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.findSearch('');
      expect(result.length).toEqual(2);
    });
    it('should findAll registers', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.findAll();
      expect(result.length).toEqual(1); // registerDataFake one reg is active = false
    });
    it('should find by ID', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.findById(registers[0].id);
      expect(result).toEqual(registers[0]);
    });
    it('should find by email', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.getByEmail(registers[0].email);
      expect(result).toEqual(registers[0]);
    });
    it('should find paginated', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.findPaginated({
        page: 0,
        count: 10,
        sort: 'id',
        sortOrder: -1,
        search: '',
      });
      expect(result.total).toEqual(registers.length);
      expect(result.data[0].id).toEqual(registers[0].id);
    });
    it('should find paginated 2', async () => {
      const registers: UserEntity[] = registerDataFake;
      const user = new UserEntity();
      Object.assign(user, registers[0]);
      const user2 = new UserEntity();
      Object.assign(user2, registers[1]);
      await repositoryMock.save(user);
      await repositoryMock.save(user2);

      const result = await repository.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });
      expect(result.total).toEqual(registers.length);
      expect(result.data[0].id).toEqual(registers[1].id);
    });
  });
});
