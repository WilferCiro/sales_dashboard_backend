export class DomainUpdateProductDto {
  name?: string;
  active?: boolean;
  sku?: string;
  presentation?: string;
  price?: number;
  description?: string;
  barcode?: string;
  category?: { id: number };
  shop?: { id: number };
}
