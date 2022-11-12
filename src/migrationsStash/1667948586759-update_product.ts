import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProduct1667948586759 implements MigrationInterface {
    name = 'updateProduct1667948586759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "files" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "modelName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product" ADD "apiLink" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "apiLink"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "modelName"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "files"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imgUrl" character varying`);
    }

}
