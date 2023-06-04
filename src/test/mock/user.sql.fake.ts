import { CreateUserDto } from 'src/users/application/dto/user.create.dto';
import { UpdateUserDto } from 'src/users/application/dto/user.update.dto';
import { UserEntity } from 'src/users/infrastructure/sql/entities/user.entity';

export const userDataFake: UserEntity[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    active: true,
    email: 'john.doe@example.com',
    phone: '123',
    password: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    active: false,
    email: 'jane.doe@example.com',
    phone: '123',
    password: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userCreateDataFake: CreateUserDto[] = userDataFake;

export const userUpdateDataFake: UpdateUserDto[] = userDataFake;
