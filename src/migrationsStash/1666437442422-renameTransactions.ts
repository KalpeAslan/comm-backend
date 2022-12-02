import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTransactions1666437442422 implements MigrationInterface {
    name = 'renameTransactions1666437442422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "txn_hash" character(66) NOT NULL, "block" bigint NOT NULL, "timestamp" TIMESTAMP NOT NULL, "status" character(18) NOT NULL, "value" numeric NOT NULL, "currency" character varying(20) NOT NULL, "additionalInfo" text, "fromId" integer, "toId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions_new" ("id" SERIAL NOT NULL, "txn_hash" character(66) NOT NULL, "block" bigint NOT NULL, "timestamp" TIMESTAMP NOT NULL, "status" character(18) NOT NULL, "value" numeric NOT NULL, "currency" character varying(20) NOT NULL, "additionalInfo" text, "from" character varying NOT NULL, "to" character varying NOT NULL, CONSTRAINT "PK_5c42b8dcda48cc8e125c542d9a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0697b5941a6016ab531b156049e" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0697b5941a6016ab531b156049e"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "transactions_new"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
