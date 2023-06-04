// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from '@nestjs/common';
import { ProductCategoryController } from '../application/controllers/product_category.controller';
import { ProductCategoryRepositoryImpl } from './sql/repositories/product_category.repository';
import { ProductCategoryServiceImpl } from '../application/services/product_category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './sql/entities/product_category.entity';

const providers: Provider[] = [
  {
    provide: 'ProductCategoryRepository',
    useClass: ProductCategoryRepositoryImpl,
  },
  {
    provide: 'ProductCategoryService',
    useClass: ProductCategoryServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductCategoryController],
  providers: providers,
})
export class ProductCategoriesModule {}
