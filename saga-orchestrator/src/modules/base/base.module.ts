import { Module } from '@nestjs/common';
import { BaseController } from './base.controller';

@Module({
  providers: [BaseController],
  exports: [BaseController],
})
export class BaseModule {}
