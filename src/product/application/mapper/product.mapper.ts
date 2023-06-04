// Nest
import { Injectable } from '@nestjs/common';

// Application
import { ProductDto } from '../dto/product.dto';

// Domain
import { Product } from 'src/product/domain/entities/product.type';
import { CreateProductDto } from '../dto/product.create.dto';
import { UpdateProductDto } from '../dto/product.update.dto';
import { DomainCreateProductDto } from 'src/product/domain/dto/product.create.dto';
import { DomainUpdateProductDto } from 'src/product/domain/dto/product.update.dto';

// Shared

@Injectable()
export class ProductMapper {
  toDomainCreate(productDto: CreateProductDto): DomainCreateProductDto {
    const {
      active,
      name,
      sku,
      presentation,
      price,
      description,
      barcode,
      category,
      shop,
    } = productDto;
    return {
      active,
      name,
      sku,
      presentation,
      price,
      description,
      barcode,
      category: { id: category },
      shop: { id: shop },
    };
  }

  toDomainUpdate(productDto: UpdateProductDto): DomainUpdateProductDto {
    const {
      active,
      name,
      sku,
      presentation,
      price,
      description,
      barcode,
      category,
      shop,
    } = productDto;
    return {
      active,
      name,
      sku,
      presentation,
      price,
      description,
      barcode,
      category: { id: category },
      shop: { id: shop },
    };
  }

  toDto(product: Product): ProductDto {
    return {
      ...product,
      shop: { id: product.shop.id, name: product.shop.name },
      category: { id: product.category.id, name: product.category.name },
    } as ProductDto;
  }

  toDtoSelect(product: Product): ProductDto {
    return {
      ...product,
      label: product.name + ' (' + product.sku + ')',
      value: product.id,
    } as ProductDto;
  }
}
