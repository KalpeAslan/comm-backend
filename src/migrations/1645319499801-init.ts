import {MigrationInterface, QueryRunner} from "typeorm";

export class init1645319499801 implements MigrationInterface {
    name = 'init1645319499801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "passportId" bigint NOT NULL, "birth_date" TIMESTAMP NOT NULL, "photo" character varying(255), "patronymic" character varying(255), "name" character varying(255) NOT NULL, "surname" character varying(255) NOT NULL, "address" character(42) NOT NULL, "phone" integer, "email" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "txn_hash" character(66) NOT NULL, "block" bigint NOT NULL, "timestamp" TIMESTAMP NOT NULL, "status" character(18) NOT NULL, "value" numeric NOT NULL, "fromId" integer, "toId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0697b5941a6016ab531b156049e" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8f7e03be67a425cce6663b36255" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8f7e03be67a425cce6663b36255"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0697b5941a6016ab531b156049e"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
