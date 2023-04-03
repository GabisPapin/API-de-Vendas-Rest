import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import {
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';
import mime from 'mime';

interface IParams {
  Bucket: string;
  Key: string;
  ACL: string;
  Body: Buffer;
  ContentType: string;
}

export default class S3StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'us-east-1',
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const { bucket } = uploadConfig.config.aws;
    const params = {
      Bucket: bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: ContentType,
    } as IParams;

    try {
      await this.client.send(new CreateBucketCommand({ Bucket: bucket }));
      await this.client.send(new PutObjectCommand(params));
      await fs.promises.unlink(originalPath);
      return file;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  public async deleteFile(file: string): Promise<void> {
    const { bucket } = uploadConfig.config.aws;
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: file,
      }),
    );
  }
}
