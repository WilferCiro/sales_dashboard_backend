import { LoginAuthDto } from 'src/auth/application/dto/auth.login.dto';

export interface AuthService {
  login(auth: LoginAuthDto): Promise<string | null>;
}
