import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { BaseController } from 'src/shared/infrastructure/controllers/base.controller';
import { LoginAuthDto } from 'src/auth/application/dto/auth.login.dto';
import { AuthService } from 'src/auth/domain/interfaces/auth.service.interface';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {
    super();
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() auth: LoginAuthDto): Promise<{ token: string | null }> {
    const token = await this.authService.login(auth);
    return { token };
  }
}
