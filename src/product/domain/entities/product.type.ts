import { ProductCategory } from 'src/product_category/domain/entities/product_category.type';
import { Shop } from 'src/shop/domain/entities/shop.type';

export class Product {
  id?: number;
  name: string;
  active: boolean;
  sku: string;
  presentation: string;
  price: number;
  description: string;
  barcode: string;
  category: ProductCategory;
  shop: Shop;
  createdAt?: Date;
  updatedAt?: Date;
}
