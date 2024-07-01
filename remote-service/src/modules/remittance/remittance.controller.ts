import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { CreateRemittanceDto } from "./dto/create-remittance.dto";
import { TransactionListDto } from "./dto/transaction-list.dto";

@Controller('remittance')
export class RemittanceController {
  constructor(private readonly remittanceService: RemittanceService) {}

  @Post('')
  createRemittance(@Body() body: CreateRemittanceDto) {
    return this.remittanceService.createRemittance(body);
  }

  @Get('transactions')
  transactionList(@Query() params: TransactionListDto) {
    return this.remittanceService.transactionList(params);
  }
}
