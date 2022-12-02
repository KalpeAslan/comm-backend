import {MigrationInterface, QueryRunner} from "typeorm";

export class updateMessageEntityCodeLength1669832713595 implements MigrationInterface {
    name = 'updateMessageEntityCodeLength1669832713595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "code" character varying(7) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "code" smallint NOT NULL`);
    }

}
