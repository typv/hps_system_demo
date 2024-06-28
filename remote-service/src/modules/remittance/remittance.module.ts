import { Module } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { RemittanceController } from './remittance.controller';

@Module({
  controllers: [RemittanceController],
  providers: [RemittanceService],
})
export class RemittanceModule {}
