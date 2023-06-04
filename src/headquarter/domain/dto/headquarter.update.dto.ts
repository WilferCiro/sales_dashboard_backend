export class DomainUpdateHeadquarterDto {
  name?: string;
  active?: boolean;
  address?: string;
  city?: { id: number };
  shop?: { id: number };
}
