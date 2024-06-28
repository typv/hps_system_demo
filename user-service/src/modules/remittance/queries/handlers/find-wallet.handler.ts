import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Wallet } from "../../../../entities/wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindWalletQuery } from "../find-wallet.query";

@QueryHandler(FindWalletQuery)
export class FindWalletHandler implements IQueryHandler<FindWalletQuery> {
  constructor(@InjectRepository(Wallet) private walletRepo: Repository<Wallet>) {}

  async execute(query: FindWalletQuery): Promise<Wallet> {
    const { id } = query;
    return await this.walletRepo.findOneBy({id});
  }
}