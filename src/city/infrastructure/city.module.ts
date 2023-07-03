// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { CityController } from './controllers/city.controller';
import { CityRepositoryImpl } from './sql/repositories/city.repository';
import { CityServiceImpl } from '../application/services/city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './sql/entities/city.entity';

const providers: Provider[] = [
  {
    provide: 'CityRepository',
    useClass: CityRepositoryImpl,
  },
  {
    provide: 'CityService',
    useClass: CityServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: providers,
})
export class CitiesModule {}
