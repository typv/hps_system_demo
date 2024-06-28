import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_S3_REGION,
}));
