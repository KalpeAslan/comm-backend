import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserEntityPhoneType1648079875648 implements MigrationInterface {
    name = 'fixUserEntityPhoneType1648079875648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "privateKeys" DROP CONSTRAINT "FK_49af7db089af86f3fc43a665206"`);
        await queryRunner.query(`ALTER TABLE "privateKeys" RENAME COLUMN "storeIdId" TO "storeId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "privateKeys" ADD CONSTRAINT "FK_7dc903e157ee50034076cb22f98" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "privateKeys" DROP CONSTRAINT "FK_7dc903e157ee50034076cb22f98"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "privateKeys" RENAME COLUMN "storeId" TO "storeIdId"`);
        await queryRunner.query(`ALTER TABLE "privateKeys" ADD CONSTRAINT "FK_49af7db089af86f3fc43a665206" FOREIGN KEY ("storeIdId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
