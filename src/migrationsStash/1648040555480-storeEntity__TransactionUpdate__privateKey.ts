import {MigrationInterface, QueryRunner} from "typeorm";

export class storeEntity_TransactionUpdate_privateKey1648040555480 implements MigrationInterface {
    name = 'storeEntity_TransactionUpdate_privateKey1648040555480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "storeName" character varying(255) NOT NULL, "imgSrc" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "tariff" smallint NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "primaryKeys" ("id" SERIAL NOT NULL, "keyHash" character varying(64) NOT NULL, "queriesCount" integer, "createdAt" TIMESTAMP NOT NULL, "storeIdId" integer, CONSTRAINT "PK_9a3c24624d44016e8d3902ea28c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "currencySymbol" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "additionalInfo" text`);
        await queryRunner.query(`ALTER TABLE "primaryKeys" ADD CONSTRAINT "FK_6d32495e4b90ee4a49a45314123" FOREIGN KEY ("storeIdId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "primaryKeys" DROP CONSTRAINT "FK_6d32495e4b90ee4a49a45314123"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "additionalInfo"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "currencySymbol"`);
        await queryRunner.query(`DROP TABLE "primaryKeys"`);
        await queryRunner.query(`DROP TABLE "stores"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
