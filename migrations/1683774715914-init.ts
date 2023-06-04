import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683774715914 implements MigrationInterface {
    name = 'Init1683774715914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "ownerId"`);
    }

}
