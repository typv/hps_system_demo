import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from "@nestjs/microservices";
import { BaseController } from "../base/base.controller";
import { EventGateway } from "../websockets/events/event.gateway";
import { constants } from "../../app/constants/common.constant";

@Controller('remittance')
export class RemittanceController extends BaseController {
  constructor(
    private readonly eventGateway: EventGateway,
  ) {
    super();
  }

  @EventPattern('transaction-completed')
  async reservationReloadDataEvent(@Payload() payload: any) {
    this.eventGateway.server
      .to('all-user')
      .emit('transaction-completed', { payload });
  }
}
