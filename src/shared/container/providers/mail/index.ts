import { container } from 'tsyringe';

import { EtherealProvider } from './implementations/ethereal.provider';
import { SESProvider } from './implementations/ses.provider';
import { IMailProvider } from './mail.provider.interface';

type MailProviders = 'ses' | 'ethereal';

const mailProvider = {
  ses: container.resolve(SESProvider),
  ethereal: container.resolve(EtherealProvider),
};

const mail = <MailProviders>process.env.disk ?? 'ethereal';

container.registerInstance<IMailProvider>(
  'EtherealProvider',
  mailProvider[mail]
);
