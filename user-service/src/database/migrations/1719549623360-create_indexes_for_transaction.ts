import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexesForTransaction1719549623360 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX idx_transaction_date_brin ON transactions USING BRIN (transaction_date);`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_transaction_date_brin;`)
  }

}
