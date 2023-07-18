import { CreateShopDto } from 'src/shop/application/dto/shop.create.dto';
import { UpdateShopDto } from 'src/shop/application/dto/shop.update.dto';
import { ShopEntity } from 'src/shop/infrastructure/sql/entities/shop.entity';

export const shopDataFake: ShopEntity[] = [
  {
    id: 1,
    name: 'name',
    nit: 'nit',
    photo: 'https://photo.com',
    owner: {
      id: 1,
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      email: '',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    headquarters: [],
    active: true,
    email: 'email@email.com',
    phone: '+57 311 111 1111',
    website: 'https://website.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'name2',
    nit: 'nit2',
    photo: 'https://photo.com',
    owner: {
      id: 2,
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      email: '',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    headquarters: [],
    active: true,
    email: 'email2@email.com',
    phone: '+57 311 111 1112',
    website: 'https://website2.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const shopCreateDataFake: CreateShopDto[] = shopDataFake.map((shop) => ({
  ...shop,
  owner: shop.owner.id,
}));

export const shopUpdateDataFake: UpdateShopDto[] = shopDataFake.map((shop) => ({
  ...shop,
  owner: shop.owner.id,
}));
