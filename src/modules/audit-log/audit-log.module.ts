import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';
import { AuditLogEntity } from './entities/audit-log.entity';
import {
  GetAllAuditLogsHandler,
  GetAuditLogCountHandler,
  GetDistinctEntityTypesHandler,
} from './queries/get-audit-log.query';
import { GetAuditLogByIdHandler } from './queries/get-audit-log-by-id.query';

const handlers = [
  GetAuditLogByIdHandler,
  GetAllAuditLogsHandler,
  GetAuditLogCountHandler,
  GetDistinctEntityTypesHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogEntity])],
  controllers: [AuditLogController],
  providers: [AuditLogService, ...handlers],
})
export class AuditLogModule {}
