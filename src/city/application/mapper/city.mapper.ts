// Nest
import { Injectable } from '@nestjs/common';

// Application
import { CityDto } from '../dto/city.dto';

// Domain
import { City } from 'src/city/domain/entities/city.type';
import { CreateCityDto } from '../dto/city.create.dto';
import { UpdateCityDto } from '../dto/city.update.dto';
import { DomainCreateCityDto } from 'src/city/domain/dto/city.create.dto';
import { DomainUpdateCityDto } from 'src/city/domain/dto/city.update.dto';
import { SelectDto } from 'src/shared/application/dto/select.dto';

// Shared

@Injectable()
export class CityMapper {
  toDomainCreate(cityDto: CreateCityDto): DomainCreateCityDto {
    const { active, department, name } = cityDto;
    return { active, department: { id: department }, name };
  }

  toDomainUpdate(cityDto: UpdateCityDto): DomainUpdateCityDto {
    const { active, department, name } = cityDto;
    return { active, department: { id: department }, name };
  }

  toDto(city: City): CityDto {
    return city as CityDto;
  }

  toDtoSelect(shop: CityDto): SelectDto {
    return {
      value: `${shop.id}`,
      label: `${shop.name}`,
      description: `${shop.department.name}`,
    };
  }
}
