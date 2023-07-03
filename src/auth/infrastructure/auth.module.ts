// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceImpl } from '../application/services/auth.service';
import { PasswordHelper } from './helpers/PasswordHelper';
import { UsersModule } from 'src/users/infrastructure/user.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    PasswordHelper,
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
