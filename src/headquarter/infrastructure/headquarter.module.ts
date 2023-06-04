// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { HeadquarterController } from '../application/controllers/headquarter.controller';
import { HeadquarterRepositoryImpl } from './sql/repositories/headquarter.repository';
import { HeadquarterServiceImpl } from '../application/services/headquarter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadquarterEntity } from './sql/entities/headquarter.entity';

const providers: Provider[] = [
  {
    provide: 'HeadquarterRepository',
    useClass: HeadquarterRepositoryImpl,
  },
  {
    provide: 'HeadquarterService',
    useClass: HeadquarterServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([HeadquarterEntity])],
  controllers: [HeadquarterController],
  providers: providers,
})
export class HeadquartersModule {}
