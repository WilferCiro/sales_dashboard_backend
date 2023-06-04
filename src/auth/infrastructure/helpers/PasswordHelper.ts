// /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
  constructor(private configService: ConfigService) {}

  public encrypt = async (password: string): Promise<string> => {
    const saltOrRounds = this.configService.get<number>('SALT_HASH');
    const hash = await bcrypt.hash(password, +saltOrRounds);
    return hash;
  };

  public compare = async (password: string, hash: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  };
}
