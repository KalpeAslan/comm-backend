import {MigrationInterface, QueryRunner} from "typeorm";

export class productUpdates1668038703431 implements MigrationInterface {
    name = 'productUpdates1668038703431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "transactions_new" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "transactions_new" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
