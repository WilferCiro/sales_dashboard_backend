import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT'),
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
