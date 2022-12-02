import {MigrationInterface, QueryRunner} from "typeorm";

export class productsEntityChangeDescNullable1668007577365 implements MigrationInterface {
    name = 'productsEntityChangeDescNullable1668007577365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`);
    }

}
