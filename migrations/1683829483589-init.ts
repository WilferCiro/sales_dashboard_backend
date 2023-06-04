import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683829483589 implements MigrationInterface {
    name = 'Init1683829483589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "headquarter" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "headquarter" DROP COLUMN "shop"`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD "cityId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD "shopId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "headquarter" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD CONSTRAINT "FK_538348cc664bd6c7e0849ca11be" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD CONSTRAINT "FK_5a0642da88d72d577d615a3dc93" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "headquarter" DROP CONSTRAINT "FK_5a0642da88d72d577d615a3dc93"`);
        await queryRunner.query(`ALTER TABLE "headquarter" DROP CONSTRAINT "FK_538348cc664bd6c7e0849ca11be"`);
        await queryRunner.query(`ALTER TABLE "headquarter" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "headquarter" DROP COLUMN "shopId"`);
        await queryRunner.query(`ALTER TABLE "headquarter" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD "shop" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD "city" character varying(200) NOT NULL`);
    }

}
