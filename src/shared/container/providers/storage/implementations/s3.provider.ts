import { S3 } from 'aws-sdk';
import fs from 'fs';
import { getType } from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';

import { IStorageProvider } from '../storage.provider.interface';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const filePath = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(filePath);
    const ContentType = <string>getType(filePath);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(filePath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
