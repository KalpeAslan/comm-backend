import {MigrationInterface, QueryRunner} from "typeorm";

export class addCurrencyTabel1668263843628 implements MigrationInterface {
    name = 'addCurrencyTabel1668263843628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currency_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "network" character varying NOT NULL, "toUsd" character varying, "toBtc" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_01dd40ec85a5fffcd14f8bcf88f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "currency_entity"`);
    }

}
