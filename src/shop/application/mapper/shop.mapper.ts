// Nest
import { Injectable } from '@nestjs/common';

// Application
import { ShopDto } from '../dto/shop.dto';

// Domain
import { Shop } from 'src/shop/domain/entities/shop.type';
import { CreateShopDto } from '../dto/shop.create.dto';
import { UpdateShopDto } from '../dto/shop.update.dto';
import { DomainCreateShopDto } from 'src/shop/domain/dto/shop.create.dto';
import { DomainUpdateShopDto } from 'src/shop/domain/dto/shop.update.dto';
import { UserMapper } from 'src/users/application/mapper/user.mapper';
import { SelectDto } from 'src/shared/application/dto/select.dto';

// Shared

@Injectable()
export class ShopMapper {
  toDomain(shopDto: ShopDto): Shop {
    const {
      id,
      active,
      name,
      nit,
      photo,
      createdAt,
      updatedAt,
      owner,
      email,
      phone,
      website,
    } = shopDto;
    return {
      id,
      active,
      name,
      nit,
      owner,
      photo,
      createdAt,
      updatedAt,
      email,
      phone,
      website,
    };
  }

  toDomainCreate(shopDto: CreateShopDto): DomainCreateShopDto {
    const { active, name, nit, owner, email, phone, website } = shopDto;
    return { active, name, nit, owner: { id: owner }, email, phone, website };
  }

  toDomainUpdate(shopDto: UpdateShopDto): DomainUpdateShopDto {
    const { active, name, nit, owner, email, phone, website } = shopDto;
    return { active, name, nit, owner: { id: owner }, email, phone, website };
  }

  toDto(shop: Shop): ShopDto {
    const userMapper = new UserMapper();
    return {
      ...shop,
      owner: userMapper.toDto(shop.owner),
      headquarters: (shop.headquarters || []).map((h) => ({
        id: h.id,
        name: h.name,
        active: h.active,
      })),
    } as ShopDto;
  }

  toDtoSelect(shop: Shop): SelectDto {
    return {
      value: `${shop.id}`,
      label: `${shop.name}`,
      description: `Nit: ${shop.nit}`,
    };
  }
}
