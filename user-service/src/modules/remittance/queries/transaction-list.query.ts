import { TransactionListDto } from "../dto/transaction-list.dto";

export class TransactionListQuery {
  constructor(public readonly params: TransactionListDto) {}
}