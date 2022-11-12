import {MigrationInterface, QueryRunner} from "typeorm";

export class productImgUrl1666441906208 implements MigrationInterface {
    name = 'productImgUrl1666441906208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "imgUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imgUrl"`);
    }

}
