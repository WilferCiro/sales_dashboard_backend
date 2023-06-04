import { Department } from 'src/department/domain/entities/department.type';

export class City {
  id?: number;
  name: string;
  active: boolean;
  department: Department;
  createdAt?: Date;
  updatedAt?: Date;
}
