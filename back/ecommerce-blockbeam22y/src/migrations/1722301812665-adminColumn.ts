import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminColumn1722301812665 implements MigrationInterface {
    name = 'AdminColumn1722301812665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
