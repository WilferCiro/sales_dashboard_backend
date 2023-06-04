import { HeadquarterEntity } from 'src/headquarter/infrastructure/sql/entities/headquarter.entity';
import { UserEntity } from 'src/users/infrastructure/sql/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'shop' })
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 12 })
  nit: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  photo: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  website: string;

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @OneToMany(() => HeadquarterEntity, (headquarter) => headquarter.shop)
  headquarters: HeadquarterEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
