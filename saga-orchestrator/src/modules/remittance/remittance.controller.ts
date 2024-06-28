import { Controller, Inject } from '@nestjs/common';
import { serviceName } from "../microservice/microservice.constant";
import { ClientProxy, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { RecordBuilderHelper } from "../record-builder/record-builder.helper";
import { CreateRemittanceDto } from "./dto/create-remittance.dto";
import { BaseController } from "../base/base.controller";

@Controller('remittance')
export class RemittanceController extends BaseController {
  constructor(
    @Inject(serviceName.USER) private readonly userMicroService: ClientProxy,
    @Inject(serviceName.NOTIFIER) private readonly notifierMicroService: ClientProxy,
    private readonly recordBuilderHelper: RecordBuilderHelper,
  ) {
    super();
  }

  @EventPattern('create-remittance-saga')
  async create(@Payload() payload: CreateRemittanceDto): Promise<any> {
    let transaction;
    try {
      const createTransactionPattern = 'create-transaction';
      const record = this.recordBuilderHelper.build(createTransactionPattern, payload);
      transaction = await this.serviceResponse(this.userMicroService.send(createTransactionPattern, record));
    } catch (createTransactionErr) {
      console.log("createTransactionErr: ", createTransactionErr);
      // Send noti
      this.notifierMicroService.emit('transaction-completed', transaction);
      return;
    }

    try {
      const completeTransactionPattern = 'complete-transaction';
      const record = this.recordBuilderHelper.build(completeTransactionPattern, { id: transaction.id });
      transaction = await this.serviceResponse(this.userMicroService.send(completeTransactionPattern, record));
    } catch (completeTransactionErr) {
      // Remove transaction
      const deleteTransactionPattern = 'delete-transaction';
      this.userMicroService.emit(deleteTransactionPattern, { id: transaction.id });
      transaction.status = 'failed';

      console.log("completeTransactionErr: ", completeTransactionErr);
    }


    const end = process.hrtime(payload.start);
    const tts = `TPS : ${end[0]} seconds and ${end[1] / 1000000} miliseconds`;
    this.notifierMicroService.emit('transaction-completed', { ...transaction, tts });
  }
}
