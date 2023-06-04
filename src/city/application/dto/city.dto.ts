import { DepartmentDto } from 'src/department/application/dto/department.dto';

export interface CityDto {
  id?: number;
  name: string;
  department: DepartmentDto;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
