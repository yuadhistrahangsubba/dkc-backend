import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { PageDto } from '../../common/dto/page.dto';
import { AuditLogDto } from './dto/audit-log.dto';
import { AuditLogPageOptionsDto } from './dto/audit-log-page-options.dto';
import { AuditLogEntity } from './entities/audit-log.entity';
import {
  GetAllAuditLogsQuery,
  GetAuditLogCountQuery,
  GetDistinctEntityTypesQuery,
} from './queries/get-audit-log.query';
import { GetAuditLogByIdQuery } from './queries/get-audit-log-by-id.query';

@Injectable()
export class AuditLogService {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * Get Audit Log By Id
   */
  findOne(id: Uuid): Promise<AuditLogEntity> {
    return this.queryBus.execute(new GetAuditLogByIdQuery(id));
  }

  /**
   * Get All Audit Logs with pagination and filtering
   */
  findAll(
    pageOptionsDto: AuditLogPageOptionsDto,
  ): Promise<PageDto<AuditLogDto>> {
    return this.queryBus.execute(new GetAllAuditLogsQuery(pageOptionsDto));
  }

  /**
   * Get total count of audit logs (optimized for badge counts)
   */
  getCount(filters?: {
    event?: string;
    entityType?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<number> {
    return this.queryBus.execute(new GetAuditLogCountQuery(filters));
  }

  /**
   * Get distinct entity types for filter dropdown
   */
  getEntityTypes(): Promise<string[]> {
    return this.queryBus.execute(new GetDistinctEntityTypesQuery());
  }
}
