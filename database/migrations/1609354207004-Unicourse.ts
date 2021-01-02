import { MigrationInterface, QueryRunner } from 'typeorm';

export class HackathonStarter1609354207004 implements MigrationInterface {
  name = 'HackathonStarter1609354207004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "email-change" ALTER COLUMN "validUntil" SET DEFAULT timezone(\'utc\', now()) + interval \'2 days\'');
    await queryRunner.query('ALTER TABLE "email-verification" ALTER COLUMN "validUntil" SET DEFAULT timezone(\'utc\', now()) + interval \'2 days\'');
    await queryRunner.query('ALTER TABLE "password-reset" ALTER COLUMN "validUntil" SET DEFAULT timezone(\'utc\', now()) + interval \'2 days\'');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "registrationDate"');
    await queryRunner.query('ALTER TABLE "user" ADD "registrationDate" TIMESTAMP NOT NULL DEFAULT timezone(\'UTC\', now())');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "registrationDate"');
    await queryRunner.query('ALTER TABLE "user" ADD "registrationDate" date NOT NULL');
    await queryRunner.query('ALTER TABLE "password-reset" ALTER COLUMN "validUntil" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "email-verification" ALTER COLUMN "validUntil" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "email-change" ALTER COLUMN "validUntil" DROP DEFAULT');
  }
}
