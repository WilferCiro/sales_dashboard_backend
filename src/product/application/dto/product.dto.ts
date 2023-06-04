export interface ProductDto {
  id?: number;
  name: string;
  active: boolean;
  sku: string;
  presentation: string;
  price: number;
  description: string;
  barcode: string;
  category: { id: number; name: string };
  shop: { id: number; name: string };
  createdAt?: Date;
  updatedAt?: Date;
}
