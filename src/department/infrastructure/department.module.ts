// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentRepositoryImpl } from './sql/repositories/department.repository';
import { DepartmentServiceImpl } from '../application/services/department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './sql/entities/department.entity';

const providers: Provider[] = [
  {
    provide: 'DepartmentRepository',
    useClass: DepartmentRepositoryImpl,
  },
  {
    provide: 'DepartmentService',
    useClass: DepartmentServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: providers,
})
export class DepartmentsModule {}
