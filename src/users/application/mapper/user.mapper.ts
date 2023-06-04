import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.type';
import { CreateUserDto } from 'src/users/application/dto/user.create.dto';
import { UpdateUserDto } from 'src/users/application/dto/user.update.dto';
import { UserDto } from 'src/users/application/dto/user.dto';
import { DomainUpdateUserDto } from 'src/users/domain/dto/user.update.dto';
import { SelectDto } from 'src/shared/application/dto/select.dto';

@Injectable()
export class UserMapper {
  toDomain(userDto: UserDto): User {
    const {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
      phone,
      password,
      active,
    } = userDto;
    return {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
      phone,
      password,
      active,
    };
  }

  toDomainCreate(createUserDto: CreateUserDto): User {
    const { firstName, lastName, email, phone, password, active } =
      createUserDto;
    return { firstName, lastName, email, phone, password, active };
  }

  toDomainUpdate(updateUserDto: UpdateUserDto): DomainUpdateUserDto {
    const { firstName, lastName, email, phone, active } = updateUserDto;
    return { firstName, lastName, email, phone, active };
  }

  toDto(user: User): UserDto {
    const {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
      phone,
      active,
    } = user;
    return {
      id,
      firstName,
      lastName,
      email,
      createdAt,
      updatedAt,
      phone,
      active,
    };
  }

  toDtoSelect(shop: UserDto): SelectDto {
    return {
      value: `${shop.id}`,
      label: `${shop.firstName} ${shop.lastName}`,
      description: `Email: ${shop.email}`,
    };
  }
}
