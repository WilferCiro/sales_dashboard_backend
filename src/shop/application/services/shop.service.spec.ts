import { ShopService } from 'src/shop/domain/interfaces/shop.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopServiceImpl } from '../services/shop.service';
import { CreateShopDto } from '../dto/shop.create.dto';
import {
  shopCreateDataFake as registerCreateDataFake,
  shopDataFake as registerDataFake,
  shopUpdateDataFake as registerUpdateDataFake,
  shopDataFake,
} from 'src/test/mock/shop.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { ShopRepositoryImpl } from 'src/shop/infrastructure/sql/repositories/shop.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shop/infrastructure/sql/entities/shop.entity';
import { Repository } from 'typeorm';
import { ShopRepository } from 'src/shop/domain/interfaces/shop.repository.interface';
import { ShopMapper } from '../mapper/shop.mapper';

describe('ShopsController', () => {
  let shopsService: ShopService;
  let shopsRepository: ShopRepository;
  let mapper: ShopMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(ShopEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'ShopRepository',
          useClass: ShopRepositoryImpl,
        },
        {
          provide: 'ShopService',
          useClass: ShopServiceImpl,
        },
      ],
    }).compile();
    mapper = new ShopMapper();

    shopsRepository = module.get<ShopRepository>('ShopRepository');
    shopsService = module.get<ShopService>('ShopService');
  });

  describe('createShop', () => {
    it('should return the created shop', async () => {
      // Arrange
      const shopDto: CreateShopDto = registerCreateDataFake[0];
      jest.spyOn(shopsRepository, 'create').mockResolvedValue(shopDataFake[0]);

      // Act
      const result = await shopsService.create(mapper.toDomainCreate(shopDto));

      // Assert
      expect(result).toEqual(shopDataFake[0]);
    });
  });

  describe('getShop', () => {
    it('should return all shops', async () => {
      // Arrange
      const shops = registerDataFake;
      jest.spyOn(shopsRepository, 'findAll').mockResolvedValue(shops);

      // Act
      const result = await shopsService.findAll();

      // Assert
      expect(result).toEqual(shops);
    });
    it('should return all select', async () => {
      // Arrange
      const shops = registerDataFake;
      jest.spyOn(shopsRepository, 'findSearch').mockResolvedValue(shops);

      // Act
      const result = await shopsService.findSearch('');

      // Assert
      expect(result).toEqual(shops);
    });
    it('should return the requested shop by ID', async () => {
      // Arrange
      const shop = registerDataFake[0];
      jest.spyOn(shopsRepository, 'findById').mockResolvedValue(shop);

      // Act
      const result = await shopsService.findById(shop.id);

      // Assert
      expect(result).toEqual(shop);
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(shopsRepository, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await shopsService.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake,
      });
    });
  });

  describe('updateShop', () => {
    it('should return the updated shop', async () => {
      // Arrange
      const shopId = 1;
      const updatedShop = registerDataFake[0];
      jest.spyOn(shopsRepository, 'update').mockResolvedValue(updatedShop);

      // Act
      const result = await shopsService.update(shopId, shopDataFake[0]);

      // Assert
      expect(result).toEqual(updatedShop);
    });
  });
});
