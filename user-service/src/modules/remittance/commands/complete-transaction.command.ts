import { Transaction } from "../../../entities/transaction.entity";
import { Wallet } from "../../../entities/wallet.entity";

export class CompleteTransactionCommand {
  constructor(
    public readonly transaction: Transaction,
    public readonly depositWallet: Wallet,
    public readonly destinationWallet: Wallet,
  ) {}
}