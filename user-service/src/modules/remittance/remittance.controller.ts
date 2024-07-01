import { Controller } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateRemittanceDto } from "./dto/create-transaction.dto";
import { TransactionListDto } from "./dto/transaction-list.dto";

@Controller('remittance')
export class RemittanceController {
  constructor(private readonly remittanceService: RemittanceService) {}

  @MessagePattern('create-transaction')
  async create(@Payload() payload: CreateRemittanceDto): Promise<any> {
    return await this.remittanceService.createTransaction(payload);
  }

  @MessagePattern('complete-transaction')
  async complete(@Payload('id') id: string): Promise<any> {
    return await this.remittanceService.completeTransaction(id);
  }

  @EventPattern('delete-transaction')
  async delete(@Payload('id') id: string): Promise<any> {
    return await this.remittanceService.deleteTransaction(id);
  }

  @MessagePattern('transaction-list')
  async transactionList(@Payload() params: TransactionListDto): Promise<any> {
    return await this.remittanceService.transactionList(params);
  }
}
