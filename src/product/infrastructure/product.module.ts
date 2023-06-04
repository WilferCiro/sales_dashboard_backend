// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { ProductController } from '../application/controllers/product.controller';
import { ProductRepositoryImpl } from './sql/repositories/product.repository';
import { ProductServiceImpl } from '../application/services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './sql/entities/product.entity';

const providers: Provider[] = [
  {
    provide: 'ProductRepository',
    useClass: ProductRepositoryImpl,
  },
  {
    provide: 'ProductService',
    useClass: ProductServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: providers,
})
export class ProductsModule {}
