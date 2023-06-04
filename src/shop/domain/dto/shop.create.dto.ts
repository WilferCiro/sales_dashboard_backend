export class DomainCreateShopDto {
  name: string;
  active: boolean;
  nit: string;
  photo?: string;
  email?: string;
  phone?: string;
  website?: string;
  owner: { id: number };
}
