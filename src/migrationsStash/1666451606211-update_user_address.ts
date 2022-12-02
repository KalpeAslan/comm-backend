import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserAddress1666451606211 implements MigrationInterface {
    name = 'updateUserAddress1666451606211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }

}
