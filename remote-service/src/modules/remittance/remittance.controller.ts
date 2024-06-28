import { Body, Controller, Post } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { CreateRemittanceDto } from "./dto/create-remittance.dto";

@Controller('remittance')
export class RemittanceController {
  constructor(private readonly remittanceService: RemittanceService) {}

  @Post('')
  createRemittance(@Body() body: CreateRemittanceDto) {
    return this.remittanceService.createRemittance(body);
  }
}
