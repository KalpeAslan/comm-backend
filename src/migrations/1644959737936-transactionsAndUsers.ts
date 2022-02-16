import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionsAndUsers1644959737936 implements MigrationInterface {
    name = 'transactionsAndUsers1644959737936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "iin" bigint NOT NULL, "birth_date" TIMESTAMP NOT NULL, "photo" character varying(255), "patronymic" character varying(255), "name" character varying(255) NOT NULL, "surname" character varying(255) NOT NULL, "address" character(42) NOT NULL, "phone" integer, "email" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "txn_hash" character(66) NOT NULL, "block" bigint NOT NULL, "timestamp" TIMESTAMP NOT NULL, "status" character(18) NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
