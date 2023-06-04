export class DomainUpdateShopDto {
  name?: string;
  active?: boolean;
  nit?: string;
  photo?: string;
  email?: string;
  phone?: string;
  website?: string;
  owner?: { id: number };
}
