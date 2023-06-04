import { CityEntity } from 'src/city/infrastructure/sql/entities/city.entity';
import { ShopEntity } from 'src/shop/infrastructure/sql/entities/shop.entity';
import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'headquarter' })
export class HeadquarterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @ManyToOne(() => CityEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'cityId' })
  city: CityEntity;

  @ManyToOne(() => ShopEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterUpdate()
  updateCounters() {
    console.log(this);
  }
}
