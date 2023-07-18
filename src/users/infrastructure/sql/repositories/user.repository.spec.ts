import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

// User specific
import { UserRepositoryImpl } from './user.repository';
import { UserEntity } from '../entities/user.entity';
import { userDataFake as registerDataFake } from 'src/test/mock/user.sql.fake';

describe('UserRepository', () => {
  let repository: UserRepositoryImpl;
  let repositoryToken: string;
  let repositoryMock: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryImpl,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<UserRepositoryImpl>(UserRepositoryImpl);
    repositoryToken = getRepositoryToken(UserEntity) as string;
    repositoryMock = module.get<Repository<UserEntity>>(repositoryToken);
  });

  describe('createUser', () => {
    it('should create a new register', async () => {
      const newUser: UserEntity = registerDataFake[0];
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(newUser);
      const emailSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(undefined);

      const result = await repository.create(newUser);

      expect(emailSpy).toHaveBeenCalledWith({ email: newUser.email });
      expect(saveSpy).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
    it('should not create a new register', async () => {
      const newUser: UserEntity = registerDataFake[0];
      const existUser: UserEntity = registerDataFake[1];
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(existUser);

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
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(register2);
      const emailSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.update(register.id, register2);

      expect(emailSpy).toHaveBeenCalledWith({ id: register.id });
      expect(saveSpy).toHaveBeenCalledWith({ id: register.id, ...register2 });
      expect(result).toEqual(register2);
    });
    it('should not update a register', async () => {
      const register: UserEntity = registerDataFake[0];
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(undefined);

      await expect(repository.update(register.id, register)).rejects.toThrow(
        new BadRequestException(`El usuario no está registrado`),
      );
    });
  });

  describe('getUser', () => {
    it('should findSearch registers', async () => {
      const registers: UserEntity[] = registerDataFake;
      jest.spyOn(repositoryMock, 'find').mockResolvedValue(registers);

      const result = await repository.findSearch('search');

      expect(result).toEqual(registers);
    });
    it('should findAll registers', async () => {
      const registers: UserEntity[] = registerDataFake;
      const findSpy = jest
        .spyOn(repositoryMock, 'findBy')
        .mockResolvedValue(registers);

      const result = await repository.findAll();

      expect(findSpy).toHaveBeenCalledWith({ active: true });
      expect(result).toEqual(registers);
    });
    it('should find by ID', async () => {
      const register: UserEntity = registerDataFake[0];
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.findById(register.id);
      expect(findSpy).toHaveBeenCalledWith({ id: register.id });
      expect(result).toEqual(register);
    });
    it('should find by email', async () => {
      const register: UserEntity = registerDataFake[0];
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.getByEmail(register.email);
      expect(findSpy).toHaveBeenCalledWith({ email: register.email });
      expect(result).toEqual(register);
    });
    it('should find paginated', async () => {
      const registers: UserEntity[] = registerDataFake;
      jest
        .spyOn(repositoryMock, 'findAndCount')
        .mockResolvedValue([registers, registers.length]);

      const result = await repository.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
      });
      expect(result).toEqual({ total: registers.length, data: registers });
    });
  });
});
