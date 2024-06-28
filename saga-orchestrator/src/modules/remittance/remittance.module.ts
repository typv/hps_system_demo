import { Module } from '@nestjs/common';
import { RemittanceController } from './remittance.controller';

@Module({
  controllers: [RemittanceController],
})
export class RemittanceModule {}
