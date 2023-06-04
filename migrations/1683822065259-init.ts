import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683822065259 implements MigrationInterface {
    name = 'Init1683822065259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "headquarter" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying(100) NOT NULL, "address" character varying(200) NOT NULL, "city" character varying(200) NOT NULL, "shop" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_379d66de625a1242e14fec857e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "phone" character varying(13)`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "email" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "website" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "phone"`);
        await queryRunner.query(`DROP TABLE "headquarter"`);
    }

}
