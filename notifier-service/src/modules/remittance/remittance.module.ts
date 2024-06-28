import { Module } from '@nestjs/common';
import { RemittanceController } from './remittance.controller';
import { EventModule } from "../websockets/events/event.module";

@Module({
  imports: [EventModule],
  controllers: [RemittanceController],
})
export class RemittanceModule {}
