import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../../../../entities/transaction.entity";
import { DataSource, Repository } from "typeorm";
import { DeleteTransactionCommand } from "../delete-transaction.command";

@CommandHandler(DeleteTransactionCommand)
export class DeleteTransactionHandle implements ICommandHandler<DeleteTransactionCommand> {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
  ) {
  }

  async execute(command: DeleteTransactionCommand) {
    const { transactionId } = command;

    return await this.transactionRepo.softDelete({id: transactionId})
  }
}
