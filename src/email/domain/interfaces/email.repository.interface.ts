// Nest

// Domain

// Shared

export interface MailRepositoryInterface {
  sendMail(to: string, subject: string, template: string, context: any): void;
}
