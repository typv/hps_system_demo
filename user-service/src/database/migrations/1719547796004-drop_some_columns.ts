import { MigrationInterface, QueryRunner } from "typeorm";

export class DropSomeColumns1719547796004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transactions', 'created_at');
        await queryRunner.dropColumns('users', ['uid', 'avatar', 'is_active', 'email_verified', 'created_at', 'updated_at', 'deleted_at']);
        await queryRunner.dropColumns('wallets', ['created_at', 'updated_at', 'deleted_at']);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
