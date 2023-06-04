import { City } from 'src/city/domain/entities/city.type';
import { Shop } from 'src/shop/domain/entities/shop.type';

export class Headquarter {
  id?: number;
  name: string;
  active: boolean;
  address: string;
  city: City;
  shop: Shop;
  createdAt?: Date;
  updatedAt?: Date;
}
