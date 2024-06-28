import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from "./user.entity";

export const TableName = 'wallets';

@Entity(TableName)
export class Wallet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column()
  balance: number;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  constructor(partial: Partial<Wallet>) {
    Object.assign(this, partial);
  }
}
