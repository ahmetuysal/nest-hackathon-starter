import { MigrationInterface, QueryRunner } from 'typeorm';

export class Unicourse1609337587358 implements MigrationInterface {
  name = 'Unicourse1609337587358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query('CREATE TABLE "email-change" ("token" character(21) NOT NULL, "newEmail" text NOT NULL, "userId" integer NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "PK_2257238e3438c07d1809a949765" PRIMARY KEY ("token"))');
    await queryRunner.query('CREATE UNIQUE INDEX "index_email-change_userId" ON "email-change" ("userId") ');
    await queryRunner.query('CREATE TABLE "email-verification" ("token" character(21) NOT NULL, "userId" integer NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "PK_6dfb0062e0a71f8612209ba8e21" PRIMARY KEY ("token"))');
    await queryRunner.query('CREATE UNIQUE INDEX "index_email-verification_userId" ON "email-verification" ("userId") ');
    await queryRunner.query('CREATE TABLE "password-reset" ("token" character(21) NOT NULL, "userId" integer NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "PK_f1ad961ee6d0da067f483338751" PRIMARY KEY ("token"))');
    await queryRunner.query('CREATE UNIQUE INDEX "index_password-reset_userId" ON "password-reset" ("userId") ');
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "passwordHash" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "middleName" text, "image" text, "emailVerified" boolean NOT NULL DEFAULT false, "birthDate" date, "registrationDate" date NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE UNIQUE INDEX "index_user_email" ON "user" ("email") ');
    await queryRunner.query('CREATE UNIQUE INDEX "index_user_username" ON "user" ("username") ');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "index_user_username"');
    await queryRunner.query('DROP INDEX "index_user_email"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP INDEX "index_password-reset_userId"');
    await queryRunner.query('DROP TABLE "password-reset"');
    await queryRunner.query('DROP INDEX "index_email-verification_userId"');
    await queryRunner.query('DROP TABLE "email-verification"');
    await queryRunner.query('DROP INDEX "index_email-change_userId"');
    await queryRunner.query('DROP TABLE "email-change"');
  }
}
