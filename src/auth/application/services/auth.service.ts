import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/domain/interfaces/auth.service.interface';
import { LoginAuthDto } from 'src/auth/application/dto/auth.login.dto';
import { UserService } from 'src/users/domain/interfaces/user.service.interface';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
  ) {}

  async login(auth: LoginAuthDto): Promise<string | null> {
    const user = await this.userService.getByEmail(auth.email);
    if (!user) {
      throw new UnauthorizedException('El correo no existe');
    }
    const isMatch = await this.passwordHelper.compare(
      auth.password,
      user?.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña no coinciden');
    }
    const payload = {
      id: user?.id,
      sub: user?.id,
      exp: Date.now() + 345600000, // add 4 days
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
