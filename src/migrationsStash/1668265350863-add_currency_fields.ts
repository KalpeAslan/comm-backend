import {MigrationInterface, QueryRunner} from "typeorm";

export class addCurrencyFields1668265350863 implements MigrationInterface {
    name = 'addCurrencyFields1668265350863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency_entity" ADD "symbol" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currency_entity" ADD "chainId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currency_entity" ADD "type" character varying NOT NULL DEFAULT 'ERC20'`);
        await queryRunner.query(`ALTER TABLE "currency_entity" ADD "decimals" integer NOT NULL DEFAULT '18'`);
        await queryRunner.query(`ALTER TABLE "currency_entity" ADD "logoURI" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency_entity" DROP COLUMN "logoURI"`);
        await queryRunner.query(`ALTER TABLE "currency_entity" DROP COLUMN "decimals"`);
        await queryRunner.query(`ALTER TABLE "currency_entity" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "currency_entity" DROP COLUMN "chainId"`);
        await queryRunner.query(`ALTER TABLE "currency_entity" DROP COLUMN "symbol"`);
    }

}
