import {MigrationInterface, QueryRunner} from "typeorm";

export class userConfirmed1646514701741 implements MigrationInterface {
    name = 'userConfirmed1646514701741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmed"`);
    }

}
