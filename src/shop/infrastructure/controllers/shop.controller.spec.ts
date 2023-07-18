import { ShopService } from 'src/shop/domain/interfaces/shop.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopServiceImpl } from '../../application/services/shop.service';
import { CreateShopDto } from '../../application/dto/shop.create.dto';
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
import { ShopMapper } from '../../application/mapper/shop.mapper';
import { userProviders } from 'src/users/infrastructure/user.module';
import { UserEntity } from 'src/users/infrastructure/sql/entities/user.entity';

describe('ShopsController', () => {
  let shopsController: ShopController;
  let shopsService: ShopService;
  let mapper: ShopMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        ...userProviders,
        {
          provide: getRepositoryToken(ShopEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
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
    shopsController = module.get<ShopController>(ShopController);
    shopsService = module.get<ShopService>('ShopService');
  });

  describe('createShop', () => {
    it('should return the created shop', async () => {
      // Arrange
      const shopDto: CreateShopDto = registerCreateDataFake[0];
      const createdShop = shopDataFake[0];
      jest.spyOn(shopsService, 'create').mockResolvedValue(createdShop);

      // Act
      const result = await shopsController.create(shopDto);

      // Assert
      expect(result).toEqual(mapper.toDto(createdShop));
    });
  });

  describe('getShop', () => {
    it('should return all the shops', async () => {
      // Arrange
      const shops = registerDataFake;
      jest.spyOn(shopsService, 'findAll').mockResolvedValue(shops);

      // Act
      const result = await shopsController.findAll();
      // Assert
      expect(result[0]).toEqual(mapper.toDto(shops[0]));
    });
    it('should return select formated', async () => {
      // Arrange
      const shops = registerDataFake;
      jest.spyOn(shopsService, 'findSearch').mockResolvedValue(shops);

      // Act
      const result = await shopsController.findSelect('');
      // Assert
      expect(result[0]).toEqual(mapper.toDtoSelect(shops[0]));
    });
    it('should return the requested shop by ID', async () => {
      // Arrange
      const shop = registerDataFake[0];
      jest.spyOn(shopsService, 'findById').mockResolvedValue(shop);

      // Act
      const result = await shopsController.findById(shop.id);
      // Assert
      expect(result).toEqual(mapper.toDto(shop));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(shopsService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await shopsController.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe('updateShop', () => {
    it('should return the updated shop', async () => {
      // Arrange
      const shopId = 1;
      const updatedShopDto = registerUpdateDataFake[0];
      const updatedShop = registerDataFake[0];
      jest.spyOn(shopsService, 'update').mockResolvedValue(updatedShop);

      // Act
      const result = await shopsController.update(shopId, updatedShopDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedShop));
    });
  });
});
