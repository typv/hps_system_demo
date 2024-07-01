import { Injectable } from '@nestjs/common';
import { BaseService } from "../base/base.service";
import { CreateRemittanceDto } from "./dto/create-transaction.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "./commands/create-transaction.command";
import { FindWalletQuery } from "./queries/find-wallet.query";
import { RpcException } from "@nestjs/microservices";
import { FindTransactionQuery } from "./queries/find-transaction.query";
import { CompleteTransactionCommand } from "./commands/complete-transaction.command";
import { DeleteTransactionCommand } from "./commands/delete-transaction.command";
import { FindUserQuery } from "../user/queries/find-user.query";
import { TransactionListDto } from "./dto/transaction-list.dto";
import { TransactionListQuery } from "./queries/transaction-list.query";

@Injectable()
export class RemittanceService extends BaseService {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    super();
  }

  async createTransaction(payload: CreateRemittanceDto) {
    return this.commandBus.execute(
      new CreateTransactionCommand(payload.depositWalletId, payload.destinationWalletId, payload.amount)
    );
  }

  async completeTransaction(id: string) {
    const transaction = await this.queryBus.execute(new FindTransactionQuery(id));
    if (!transaction) throw new RpcException('Transaction not found.');
    if (transaction.status !== 'pending') throw new RpcException('Transaction status is invalid.');
    const depositWallet = await this.queryBus.execute(new FindWalletQuery(transaction.depositWalletId));
    if (!depositWallet) throw new RpcException('Deposit Wallet not found.');
    if (depositWallet.balance < transaction.amount) throw new RpcException('The balance in the wallet is not enough.');
    const destinationWallet = await this.queryBus.execute(new FindWalletQuery(transaction.destinationWalletId));
    if (!destinationWallet) throw new RpcException('Destination Wallet not found.');
    const sender = await this.queryBus.execute(new FindUserQuery(depositWallet.userId));
    const receiver = await this.queryBus.execute(new FindUserQuery(destinationWallet.userId));

    const completed = await this.commandBus.execute(
      new CompleteTransactionCommand(transaction, depositWallet, destinationWallet)
    );

    return {
      ...completed,
      sender,
      receiver,
    };
  }

  async deleteTransaction(id: string) {
    await this.commandBus.execute(
      new DeleteTransactionCommand(id)
    );

    return true;
  }

  async transactionList(params: TransactionListDto) {
    return await this.queryBus.execute(new TransactionListQuery(params));
  }
}
