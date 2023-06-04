export class DomainCreateHeadquarterDto {
  name: string;
  active: boolean;
  address: string;
  city: { id: number };
  shop: { id: number };
}
