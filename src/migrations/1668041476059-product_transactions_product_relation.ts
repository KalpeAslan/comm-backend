import {MigrationInterface, QueryRunner} from "typeorm";

export class productTransactionsProductRelation1668041476059 implements MigrationInterface {
    name = 'productTransactionsProductRelation1668041476059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD CONSTRAINT "FK_3be8c47621c11413305340af68c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP CONSTRAINT "FK_3be8c47621c11413305340af68c"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "productId"`);
    }

}
