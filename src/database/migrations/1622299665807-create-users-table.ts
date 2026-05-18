import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
  name = 'createUsersTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
    );
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"                uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"        TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at"        TIMESTAMP         NOT NULL DEFAULT now(),
        "full_name"         character varying NOT NULL,
        "role"              "users_role_enum" NOT NULL DEFAULT 'USER',
        "identification_no" character varying NOT NULL,
        "password"          character varying NOT NULL,
        "mobile_no"         character varying,
        "avatar"            character varying,
        "is_active"         boolean                    DEFAULT true,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
