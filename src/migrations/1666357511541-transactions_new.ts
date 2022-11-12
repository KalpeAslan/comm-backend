import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionsNew1666357511541 implements MigrationInterface {
    name = 'transactionsNew1666357511541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0697b5941a6016ab531b156049e"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "fromId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "fromId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0697b5941a6016ab531b156049e" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0697b5941a6016ab531b156049e"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "fromId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "fromId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0697b5941a6016ab531b156049e" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
