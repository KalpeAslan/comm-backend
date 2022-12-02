import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddRefreshToken_currencyNullable1669573228268 implements MigrationInterface {
    name = 'userAddRefreshToken_currencyNullable1669573228268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_167ea332c5e922fa78743118ef9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_a21ab5365f95f015dba8845143c"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "currencyId" TO "currency"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencyFromId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencyToId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "currency" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "currency" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "currency" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "currency" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencyToId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencyFromId" integer`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "currency" TO "currencyId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_a21ab5365f95f015dba8845143c" FOREIGN KEY ("currencyToId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_167ea332c5e922fa78743118ef9" FOREIGN KEY ("currencyFromId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7" FOREIGN KEY ("currencyId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
