import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationProduct1668288670921 implements MigrationInterface {
    name = 'changeRelationProduct1668288670921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_498f0ae3619a8e1f2f42434a4f7"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7" FOREIGN KEY ("currencyId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_498f0ae3619a8e1f2f42434a4f7" UNIQUE ("currencyId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_498f0ae3619a8e1f2f42434a4f7" FOREIGN KEY ("currencyId") REFERENCES "currency_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
