import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from "./wallet.entity";

export const TableName = 'transactions';

@Entity(TableName)
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  depositWalletId: string;

  @Column()
  destinationWalletId: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column({ type: 'jsonb' })
  remittanceMetadata: {
    depositBalanceBefore: number,
    depositBalanceAfter: number,
    destinationBalanceBefore: number,
    destinationBalanceAfter: number,
  };

  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: string;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
