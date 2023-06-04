import { ProductCategoryEntity } from 'src/product_category/infrastructure/sql/entities/product_category.entity';
import { ShopEntity } from 'src/shop/infrastructure/sql/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @Column({ type: 'varchar', length: '20', nullable: true })
  sku: string;

  @Column({ type: 'varchar', length: '20', nullable: true })
  presentation: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: '200', nullable: true })
  barcode: string;

  @ManyToOne(() => ProductCategoryEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategoryEntity;

  @ManyToOne(() => ShopEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
