import {MigrationInterface, QueryRunner} from "typeorm";

export class updateMessageEntity1669830501576 implements MigrationInterface {
    name = 'updateMessageEntity1669830501576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "code" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "code" character varying(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "type" character varying(254) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "state" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "token" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "date" TIMESTAMP NOT NULL`);
    }

}
