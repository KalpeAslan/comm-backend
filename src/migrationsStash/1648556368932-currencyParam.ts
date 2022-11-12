import {MigrationInterface, QueryRunner} from "typeorm";

export class currencyParam1648556368932 implements MigrationInterface {
    name = 'currencyParam1648556368932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "currencySymbol" TO "currency"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "currency" TO "currencySymbol"`);
    }

}
