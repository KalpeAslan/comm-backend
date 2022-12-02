import {MigrationInterface, QueryRunner} from "typeorm";

export class addCurrencyRealtions1668264818868 implements MigrationInterface {
    name = 'addCurrencyRealtions1668264818868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencyFromId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencyToId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_167ea332c5e922fa78743118ef9" FOREIGN KEY ("currencyFromId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_a21ab5365f95f015dba8845143c" FOREIGN KEY ("currencyToId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_a21ab5365f95f015dba8845143c"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_167ea332c5e922fa78743118ef9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencyToId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencyFromId"`);
    }

}
