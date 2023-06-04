import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const EmailProvider = MailerModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      transport: {
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: configService.get('SENDGRID_USER'),
          pass: configService.get('SENDGRID_API_KEY'),
        },
      },
      defaults: {
        from: configService.get('SENDGRID_EMAIL'),
      },
    };
  },
  inject: [ConfigService],
});
