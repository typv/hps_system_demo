import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../../../../entities/transaction.entity";
import { DataSource, Repository } from "typeorm";
import { CompleteTransactionCommand } from "../complete-transaction.command";
import { RpcException } from "@nestjs/microservices";

@CommandHandler(CompleteTransactionCommand)
export class CompleteTransactionHandle implements ICommandHandler<CompleteTransactionCommand> {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
    private readonly dataSource: DataSource,
  ) {
  }

  async execute(command: CompleteTransactionCommand) {
    const { transaction, depositWallet, destinationWallet } = command;

    const amount = transaction.amount;
    const depositWalletBalance = depositWallet.balance - amount;
    const destinationWalletBalance = destinationWallet.balance + amount;
    const remittanceMetadata = {
      depositBalanceBefore: depositWallet.balance,
      depositBalanceAfter: depositWalletBalance,
      destinationBalanceBefore: destinationWallet.balance,
      destinationBalanceAfter: destinationWalletBalance,
    };
    transaction.status = 'completed';
    transaction.remittanceMetadata = remittanceMetadata;

    let success = true;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(Transaction, transaction);
      depositWallet.balance = depositWalletBalance;
      destinationWallet.balance = destinationWalletBalance;
      await queryRunner.manager.save([depositWallet, destinationWallet]);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      success = false;
    } finally {
      await queryRunner.release();
    }

    return {
      transaction,
      success
    };
  }
}
