import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Wallet } from "../../../../entities/wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindTransactionQuery } from "../find-transaction.query";
import { Transaction } from "../../../../entities/transaction.entity";

@QueryHandler(FindTransactionQuery)
export class FindTransactionHandler implements IQueryHandler<FindTransactionQuery> {
  constructor(@InjectRepository(Transaction) private transactionRepo: Repository<Wallet>) {}

  async execute(query: FindTransactionQuery): Promise<Wallet> {
    const { id } = query;
    return await this.transactionRepo.findOneBy({id});
  }
}