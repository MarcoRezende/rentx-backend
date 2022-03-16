import { IMailProvider } from '../mail.provider.interface';

export class MailInMemoryProvider implements IMailProvider {
  messages: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
