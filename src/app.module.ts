import { Module } from '@nestjs/common';
import { UsersModule } from './users/infrastructure/user.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { CoreModule } from './shared/core.module';
import { PostgresProvider } from './shared/infrastructure/database/postgresql/postgresql.provider';
import { CitiesModule } from './city/infrastructure/city.module';
import { EmailProvider } from './shared/infrastructure/email/email.provider';
import { ShopsModule } from './shop/infrastructure/shop.module';
import { DepartmentsModule } from './department/infrastructure/department.module';
import { HeadquartersModule } from './headquarter/infrastructure/headquarter.module';
import { ProductsModule } from './product/infrastructure/product.module';
import { ProductCategoriesModule } from './product_category/infrastructure/product_category.module';

@Module({
  imports: [
    CoreModule,
    PostgresProvider,
    EmailProvider,
    UsersModule,
    CitiesModule,
    DepartmentsModule,
    AuthModule,
    ShopsModule,
    HeadquartersModule,
    ProductCategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
