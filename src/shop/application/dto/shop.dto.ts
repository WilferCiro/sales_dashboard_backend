import { UserDto } from 'src/users/application/dto/user.dto';

export interface ShopDto {
  id?: number;
  name: string;
  active: boolean;
  nit: string;
  photo: string;
  owner: UserDto;
  email: string;
  phone: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}
