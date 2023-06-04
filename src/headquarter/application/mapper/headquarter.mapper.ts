// Nest
import { Injectable } from '@nestjs/common';

// Application
import { HeadquarterDto } from '../dto/headquarter.dto';

// Domain
import { Headquarter } from 'src/headquarter/domain/entities/headquarter.type';
import { CreateHeadquarterDto } from '../dto/headquarter.create.dto';
import { UpdateHeadquarterDto } from '../dto/headquarter.update.dto';
import { DomainCreateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.create.dto';
import { DomainUpdateHeadquarterDto } from 'src/headquarter/domain/dto/headquarter.update.dto';

// Shared

@Injectable()
export class HeadquarterMapper {
  toDomainCreate(
    headquarterDto: CreateHeadquarterDto,
  ): DomainCreateHeadquarterDto {
    const { active, name, address, city, shop } = headquarterDto;
    return { active, name, address, city: { id: city }, shop: { id: shop } };
  }

  toDomainUpdate(
    headquarterDto: UpdateHeadquarterDto,
  ): DomainUpdateHeadquarterDto {
    const { active, name, address, city, shop } = headquarterDto;
    return { active, name, address, city: { id: city }, shop: { id: shop } };
  }

  toDto(headquarter: Headquarter): HeadquarterDto {
    return {
      ...headquarter,
      shop: { name: headquarter.shop.name, id: headquarter.shop.id },
      city: {
        id: headquarter.city.id,
        name: headquarter.city.name,
      },
    } as HeadquarterDto;
  }
}
