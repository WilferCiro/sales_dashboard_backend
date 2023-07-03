// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { ShopController } from './controllers/shop.controller';
import { ShopRepositoryImpl } from './sql/repositories/shop.repository';
import { ShopServiceImpl } from '../application/services/shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './sql/entities/shop.entity';
import { FilesModule } from 'src/files/infrastructure/files.module';

const providers: Provider[] = [
  {
    provide: 'ShopRepository',
    useClass: ShopRepositoryImpl,
  },
  {
    provide: 'ShopService',
    useClass: ShopServiceImpl,
  },
];

@Module({
  imports: [FilesModule, TypeOrmModule.forFeature([ShopEntity])],
  controllers: [ShopController],
  providers: providers,
})
export class ShopsModule {}
