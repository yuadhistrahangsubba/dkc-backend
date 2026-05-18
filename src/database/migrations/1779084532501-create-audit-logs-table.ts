import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditLogsTable1779084532501 implements MigrationInterface {
  name = 'createAuditLogsTable1779084532501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"audit_logs_event_enum\" AS ENUM('CREATE', 'READ', 'UPDATE', 'DELETE')",
    );
    await queryRunner.query(`
      CREATE TABLE "audit_logs"
      (
        "id"               uuid                       NOT NULL DEFAULT uuid_generate_v4(),
        "created_at"       TIMESTAMP                  NOT NULL DEFAULT now(),
        "updated_at"       TIMESTAMP                  NOT NULL DEFAULT now(),
        "event"            "audit_logs_event_enum"    NOT NULL,
        "entity_type"      character varying(100)     NOT NULL,
        "entity_id"        uuid,
        "entity_name"      character varying(150),
        "data"             json,
        "created_by_id"    uuid,
        "created_by_name"  character varying(150),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "audit_logs"');
    await queryRunner.query('DROP TYPE "audit_logs_event_enum"');
  }
}
