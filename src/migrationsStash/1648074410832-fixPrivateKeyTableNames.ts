import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPrivateKeyTableNames1648074410832 implements MigrationInterface {
    name = 'fixPrivateKeyTableNames1648074410832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "privateKeys" ("id" SERIAL NOT NULL, "keyHash" character varying(64) NOT NULL, "queriesCount" integer, "createdAt" TIMESTAMP NOT NULL, "storeIdId" integer, CONSTRAINT "PK_523c1b0c47f7bed33b690e355e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "privateKeys" ADD CONSTRAINT "FK_49af7db089af86f3fc43a665206" FOREIGN KEY ("storeIdId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "privateKeys" DROP CONSTRAINT "FK_49af7db089af86f3fc43a665206"`);
        await queryRunner.query(`DROP TABLE "privateKeys"`);
    }

}
