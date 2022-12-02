import {MigrationInterface, QueryRunner} from "typeorm";

export class productTransaction1668030785614 implements MigrationInterface {
    name = 'productTransaction1668030785614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productTransactions" ("id" SERIAL NOT NULL, "price" character varying NOT NULL, "currency" character varying NOT NULL, "value" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "buyerId" integer, "sellerId" integer, CONSTRAINT "PK_ee459f7526f3293bc0dd9ec1d1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD CONSTRAINT "FK_4c9f454415de5f51e3192c66de0" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productTransactions" ADD CONSTRAINT "FK_a276f8cbc98ecc49dd756235899" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP CONSTRAINT "FK_a276f8cbc98ecc49dd756235899"`);
        await queryRunner.query(`ALTER TABLE "productTransactions" DROP CONSTRAINT "FK_4c9f454415de5f51e3192c66de0"`);
        await queryRunner.query(`DROP TABLE "productTransactions"`);
    }

}
