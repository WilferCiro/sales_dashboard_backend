// Nest

// Domain

// Shared

export interface MailServiceInterface {
  sendMail(to: string, subject: string, template: string, context: any): void;
}
