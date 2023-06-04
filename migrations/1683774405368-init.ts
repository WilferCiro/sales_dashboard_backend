import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683774405368 implements MigrationInterface {
    name = 'Init1683774405368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "nit" character varying(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "photo" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_c99da3ee823cda1b587b24321dc"`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "departmentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "name" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_c99da3ee823cda1b587b24321dc" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_c99da3ee823cda1b587b24321dc"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "city" ALTER COLUMN "departmentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_c99da3ee823cda1b587b24321dc" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "nit"`);
    }

}
