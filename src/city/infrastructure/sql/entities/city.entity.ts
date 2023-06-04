import { DepartmentEntity } from 'src/department/infrastructure/sql/entities/department.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => DepartmentEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
