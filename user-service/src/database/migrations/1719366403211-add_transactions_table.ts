import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddTransactionsTable1719366403211 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'deposit_wallet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'destination_wallet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'remittance_metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'amount',
            type: 'decimal(15,2)',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions', true);
  }

}
