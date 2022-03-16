import { container } from 'tsyringe';

import { LocalStorageProvider } from '../implementations/local-storage.provider';
import { S3StorageProvider } from './implementations/s3.provider';
import { IStorageProvider } from './storage.provider.interface';

type StorageProviders = 'local' | 's3';

const diskStorage = {
  s3: S3StorageProvider,
  local: LocalStorageProvider,
};

const disk = <StorageProviders>process.env.disk ?? 'local';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[disk]
);
