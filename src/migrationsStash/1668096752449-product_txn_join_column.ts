import {MigrationInterface, QueryRunner} from "typeorm";

export class productTxnJoinColumn1668096752449 implements MigrationInterface {
    name = 'productTxnJoinColumn1668096752449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "transactionId" integer`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD CONSTRAINT "UQ_6ab407c1c033a4056320b538490" UNIQUE ("transactionId")`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD CONSTRAINT "FK_6ab407c1c033a4056320b538490" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP CONSTRAINT "FK_6ab407c1c033a4056320b538490"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP CONSTRAINT "UQ_6ab407c1c033a4056320b538490"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "transactionId"`);
    }

}
