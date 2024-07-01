import { Module } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { RemittanceController } from './remittance.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateTransactionHandle } from "./commands/handlers/create-transaction.handle";
import { Transaction } from "../../entities/transaction.entity";
import { Wallet } from "../../entities/wallet.entity";
import { User } from "../../entities/user.entity";
import { FindWalletHandler } from "./queries/handlers/find-wallet.handler";
import { FindTransactionHandler } from "./queries/handlers/find-transaction.handler";
import { CompleteTransactionHandle } from "./commands/handlers/complete-transaction.handle";
import { DeleteTransactionHandle } from "./commands/handlers/delete-transaction.handle";
import { UserModule } from "../user/user.module";
import { TransactionListHandle } from "./queries/handlers/transaction-list.handle";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Wallet, User]),
    CqrsModule,
    UserModule,
  ],
  controllers: [RemittanceController],
  providers: [
    RemittanceService,
    CreateTransactionHandle,
    FindWalletHandler,
    FindTransactionHandler,
    CompleteTransactionHandle,
    DeleteTransactionHandle,
    TransactionListHandle,
  ],
})
export class RemittanceModule {}
