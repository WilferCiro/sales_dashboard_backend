import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongodbProvider = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get('MONGODB_URI'),
    };
  },
  inject: [ConfigService],
});
