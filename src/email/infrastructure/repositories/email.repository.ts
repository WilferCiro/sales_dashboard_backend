// Nestjs
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

// Infraestructure

// Application

// Domain
import { MailRepositoryInterface } from 'src/email/domain/interfaces/email.repository.interface';

// Shared

@Injectable()
export class MailRepositoryImpl implements MailRepositoryInterface {
  constructor(private readonly mailerService: MailerService) {}
  sendMail(to: string, subject: string, template: string, context: any): void {
    try {
      this.mailerService
        .sendMail({
          to,
          subject,
          template,
          context,
        })
        .then((data) => {
          console.log(data);
        });
    } catch (e) {
      console.log('Error al enviar el email: ', e);
    }
  }
}
