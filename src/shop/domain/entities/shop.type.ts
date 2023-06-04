import { Headquarter } from 'src/headquarter/domain/entities/headquarter.type';
import { User } from 'src/users/domain/entities/user.type';

export class Shop {
  id?: number;
  name: string;
  nit: string;
  photo: string;
  owner: User;
  headquarters?: Headquarter[];
  active: boolean;
  email?: string;
  phone?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
