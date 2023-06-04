// Nest
import { Inject, Injectable } from '@nestjs/common';
import { MailRepositoryInterface } from 'src/email/domain/interfaces/email.repository.interface';
import { MailServiceInterface } from 'src/email/domain/interfaces/email.service.interface';

// Application

// Domain

// Shared

@Injectable()
export class MailServiceImp implements MailServiceInterface {
  constructor(
    @Inject('EmailRepository')
    private readonly mailRepository: MailRepositoryInterface,
  ) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    await this.mailRepository.sendMail(to, subject, template, context);
  }
}
