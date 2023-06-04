// Nest
import { Injectable } from '@nestjs/common';

// Application
import { ProductCategoryDto } from '../dto/product_category.dto';

// Domain
import { ProductCategory } from 'src/product_category/domain/entities/product_category.type';
import { CreateProductCategoryDto } from '../dto/product_category.create.dto';
import { UpdateProductCategoryDto } from '../dto/product_category.update.dto';
import { DomainCreateProductCategoryDto } from 'src/product_category/domain/dto/product_category.create.dto';
import { DomainUpdateProductCategoryDto } from 'src/product_category/domain/dto/product_category.update.dto';
import { SelectDto } from 'src/shared/application/dto/select.dto';

// Shared

@Injectable()
export class ProductCategoryMapper {
  toDomainCreate(
    productCategoryDto: CreateProductCategoryDto,
  ): DomainCreateProductCategoryDto {
    const { active, name } = productCategoryDto;
    return { active, name };
  }

  toDomainUpdate(
    productCategoryDto: UpdateProductCategoryDto,
  ): DomainUpdateProductCategoryDto {
    const { active, name } = productCategoryDto;
    return { active, name };
  }

  toDto(productCategory: ProductCategory): ProductCategoryDto {
    return productCategory as ProductCategoryDto;
  }

  toDtoSelect(productCategory: ProductCategory): SelectDto {
    return {
      label: productCategory.name,
      value: `${productCategory.id}`,
    };
  }
}
