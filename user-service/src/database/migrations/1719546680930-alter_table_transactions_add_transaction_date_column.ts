import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTransactionsAddTransactionDateColumn1719546680930 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: "transaction_date",
        type: "date",
        default: "now()"
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'transaction_date')
  }

}
