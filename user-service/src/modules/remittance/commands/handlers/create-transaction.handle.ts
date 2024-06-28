import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "../create-transaction.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../../../../entities/transaction.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandle implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>
  ) {}

  async execute(command: CreateTransactionCommand) {
    const { depositWalletId, destinationWalletId, amount } = command;
    const transaction = await this.transactionRepo.save({ depositWalletId, destinationWalletId, amount });

    return transaction;
  }
}
