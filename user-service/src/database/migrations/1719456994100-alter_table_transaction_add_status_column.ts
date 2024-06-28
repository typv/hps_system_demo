import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTransactionAddStatusColumn1719456994100 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: "status",
        type: "varchar",
        default: "'pending'"
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'status')
  }

}
