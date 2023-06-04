export interface HeadquarterDto {
  id?: number;
  name: string;
  active: boolean;
  address: string;
  city: {
    name: string;
    id: number;
  };
  shop: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
