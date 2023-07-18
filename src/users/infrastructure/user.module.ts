// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Global, Module, Provider } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServiceImpl } from '../application/services/user.service';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { UserRepositoryImpl } from './sql/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './sql/entities/user.entity';
import { MailModule } from 'src/email/infrastructure/email.module';
import { FilesModule } from 'src/files/infrastructure/files.module';

export const userProviders: Provider[] = [
  {
    provide: 'UserRepository',
    useClass: UserRepositoryImpl,
  },
  {
    provide: 'UserService',
    useClass: UserServiceImpl,
  },
];
@Global()
@Module({
  imports: [FilesModule, MailModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [PasswordHelper, ...userProviders],
  exports: [...userProviders],
})
export class UsersModule {}
